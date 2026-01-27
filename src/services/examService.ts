import sql from '../connections/databaseConnection';
import { IGenerateExamDTO, IExam, IExamQuestionItem, IExamPaperRow, IExamPaperQuestion } from '../types/exam.types';
import { ISqlResponse } from '../types/department.types';

export class ExamService {
    
    static async createExam(data:IGenerateExamDTO) : Promise<{success : boolean; message:string}>{
            const request = new sql.Request();
            const result = await request
            .input('ExamNo', sql.Int, data.ExamNo)
            .input('courseId', sql.Int, data.courseId)
            .input('examDuration', sql.Int, data.examDuration)
            .input('noOfQuestions', sql.Int, data.noOfQuestions)
            .input('examDate', sql.Date, data.examDate)
            .input('totalGrade', sql.Int, data.totalGrade)
            .execute("sp_Exam_Insert")
            const response = result.recordset[0] as ISqlResponse;
            return { success: response.Success === 1, message: response.Message };
    }

    static async getExamById(examNo: number): Promise<IExam | null> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .execute('sp_Exam_GetById');

        return result.recordset[0] || null;
    }
    // 1. GENERATE EXAM (The "Magic" Button)
    // This creates the Exam Header AND randomly picks questions
    static async generateExam(data: IGenerateExamDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('ExamNo', sql.Int, data.ExamNo)
            .input('courseId', sql.Int, data.courseId)
            .input('examDuration', sql.Int, data.examDuration)
            .input('noOfQuestions', sql.Int, data.noOfQuestions)
            .input('examDate', sql.Date, data.examDate)
            .input('totalGrade', sql.Int, data.totalGrade)
            .execute('sp_GenerateExam'); // Uses the randomization logic we wrote in SQL

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 2. Get All Exams (Headers only)
    static async getAllExams(): Promise<IExam[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Exam_GetAll');
        return result.recordset;
    }

    // 3. Get Questions in a Specific Exam
    static async getExamQuestions(examNo: number): Promise<IExamQuestionItem[]> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .execute('sp_ExamQuestion_GetByExam');
        
        return result.recordset;
    }

    // 4. Manual Add: Add a specific question to an exam
    static async addQuestionToExam(examNo: number, questionId: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .input('questionId', sql.Int, questionId)
            .execute('sp_ExamQuestion_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 5. Manual Delete: Remove a question from an exam
    static async removeQuestionFromExam(examNo: number, questionId: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .input('questionId', sql.Int, questionId)
            .execute('sp_ExamQuestion_Delete');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 6. Delete Entire Exam
    static async deleteExam(examNo: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .execute('sp_Exam_Delete');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
    // Remove ALL Questions (Reset Exam Paper)
    static async removeAllQuestionsFromExam(examNo: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .execute('sp_ExamQuestion_DeleteAll');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    static async getExamPaper(examNo: number): Promise<IExamPaperQuestion[]> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .execute('sp_Exam_GetQuestionsWithAnswers'); // The Student SP

        // Helper to transform Flat SQL -> Nested JSON
        return this.groupQuestions(result.recordset);
    }

    // Get Exam Answer Key (For Instructor)
    static async getExamKey(examNo: number): Promise<IExamPaperQuestion[]> {
        const request = new sql.Request();
        const result = await request
            .input('ExamNo', sql.Int, examNo)
            .execute('sp_Exam_GetQuestionsWithCorrectAnswers'); // The Instructor SP

        return this.groupQuestions(result.recordset);
    }


    // questionId: number;
    // questionText: string;
    // questionGrade: number;
    // difficulty: string;
    // answerId: number;
    // answerText: string;
    // isCorrect?: boolean;

    // questionId: number;
    // questionText: string;
    // questionGrade: number;
    // difficulty: string;
    // answers: {
    //     answerId: number;
    //     answerText: string;
    //     isCorrect?: boolean;
    // }[];
    
    // Helper Function: Groups flat rows into Questions with Answer Arrays
    private static groupQuestions(rows: IExamPaperRow[]): IExamPaperQuestion[] {
        const map = new Map<number, IExamPaperQuestion>();

        rows.forEach(row => {
            if (!map.has(row.questionId)) {
                map.set(row.questionId, {
                    questionId: row.questionId,
                    questionText: row.questionText,
                    questionGrade: row.questionGrade,
                    difficulty: row.difficulty,
                    answers: []
                });
            }

            // Push the answer to the array
            if (row.answerId) {
                map.get(row.questionId)!.answers.push({
                    answerId: row.answerId,
                    answerText: row.answerText,
                    isCorrect: row.isCorrect // Will be undefined for students
                });
            }
        });

        return Array.from(map.values());
    }
    
}