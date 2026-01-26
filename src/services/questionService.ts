import sql from '../connections/databaseConnection';
import { ICreateQuestionDTO, IQuestion, IUpdateQuestionDTO } from '../types/question.types';
import { ISqlResponse } from '../types/department.types';

export class QuestionService {
    
    static async createQuestion(data: ICreateQuestionDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('questionId', sql.Int, data.questionId)
            .input('courseId', sql.Int, data.courseId)
            .input('difficulty', sql.VarChar(20), data.difficulty)
            .input('questionText', sql.VarChar(sql.MAX), data.questionText)
            .input('questionGrade', sql.Int, data.questionGrade)
            .execute('sp_Question_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    static async getAllQuestions(): Promise<IQuestion[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Question_GetAll');
        return result.recordset;
    }

    static async getQuestionById(id: number): Promise<IQuestion | null> {
        const request = new sql.Request();
        const result = await request
            .input('questionId', sql.Int, id)
            .execute('sp_Question_GetById');

        return result.recordset[0] || null;
    }

    static async updateQuestion(id: number, data: IUpdateQuestionDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('questionId', sql.Int, id)
            .input('courseId', sql.Int, data.courseId || null)
            .input('difficulty', sql.VarChar(20), data.difficulty || null)
            .input('questionText', sql.VarChar(sql.MAX), data.questionText || null)
            .input('questionGrade', sql.Int, data.questionGrade || null)
            .execute('sp_Question_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    static async deleteQuestion(id: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('questionId', sql.Int, id)
            .execute('sp_Question_Delete');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    
}