import sql from '../connections/databaseConnection';
import { IStartExamDTO, ISubmitAnswerDTO, IUpdateAnswerDTO, IAttempt, IStudentExamResultItem } from '../types/attempt.types';
import { ISqlResponse } from '../types/department.types';

export class AttemptService {
    
    // Start Exam (Create Attempt Header)
    static async startExam(userName: string, data: IStartExamDTO): Promise<{ success: boolean; message: string; attemptId?: number }> {
        const request = new sql.Request();

        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('examNo', sql.Int, data.examNo)
            .execute('sp_ExamAttempt_Insert');


             const response = result.recordset[0];
             return { 
                 success: response.Success === 1, 
                 message: response.Message, 
                 attemptId: response.AttemptId 
             };
    }

    // Submit Answer (Single Question)
    static async submitAnswer(data: ISubmitAnswerDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('attemptId', sql.Int, data.attemptId)
            .input('questionId', sql.Int, data.questionId)
            .input('selectedAnswerId', sql.Int, data.selectedAnswerId)
            .execute('sp_ExamAttemptDetails_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // Change Answer (If student changes mind)
    static async changeAnswer(data: IUpdateAnswerDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('attemptId', sql.Int, data.attemptId)
            .input('questionId', sql.Int, data.questionId)
            .input('newAnswerId', sql.Int, data.newAnswerId)
            .execute('sp_ExamAttemptDetails_Update');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    //  Finish & Grade Exam (Correction)
    static async finishExam(attemptId: number): Promise<{ success: boolean; message: string; studentScore?: number }> {
        const request = new sql.Request();
        
        const result = await request
            .input('attemptId', sql.Int, attemptId)
            .execute('sp_CorrectExam'); // This calculates Score and updates the header

        const response = result.recordset[0];
        return { 
            success: response.Success === 1, 
            message: response.Message,
            studentScore: response.StudentScore
        };
    }

    //  Get Student History
    static async getStudentAttempts(userName: string): Promise<IAttempt[]> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_ExamAttempt_GetByStudent');
        
        return result.recordset;
    }

    static async getStudentExamAnswers(attemptId: number): Promise<IStudentExamResultItem[]> {
        const request = new sql.Request();
        const result = await request
            .input('AttemptId', sql.Int, attemptId)
            // We don't need ExamNo/User here because AttemptId is unique and sufficient
            .execute('sp_Report_GetStudentExamAnswers');
        
        return result.recordset;
    }

      static async getExamAttempts(examNo: number): Promise<IAttempt[]> {
        const request = new sql.Request();
        const result = await request
            .input('examNo', sql.Int, examNo)
            .execute('sp_ExamAttempt_GetByExam');
        
        return result.recordset;
    }
}  