import sql from '../connections/databaseConnection';
import { IAnswer, ICreateAnswerDTO, IUpdateAnswerDTO } from '../types/answer.types';
import { ISqlResponse } from '../types/department.types';

export class AnswerService {
    
    // 1. Create Answer
    static async createAnswer(data: ICreateAnswerDTO): Promise<{ success: boolean; message: string, answerId?: number }> {
        const request = new sql.Request();

        const result = await request
            .input('questionId', sql.Int, data.questionId)
            .input('isCorrect', sql.Bit, data.isCorrect) // 1 or 0
            .input('answerText', sql.VarChar(sql.MAX), data.answerText)
            .execute('sp_QuestionAnswers_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message, answerId: response.answerId };
    }

    // 2. Get All Answers (Admin/Debug mostly)
    static async getAllAnswers(): Promise<IAnswer[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_QuestionAnswers_GetAll');
        return result.recordset;
    }

    // 3. Get Answer by ID
    static async getAnswerById(id: number): Promise<IAnswer | null> {
        const request = new sql.Request();
        const result = await request
            .input('answerId', sql.Int, id)
            .execute('sp_QuestionAnswers_GetById');

        return result.recordset[0] || null;
    }
 
    // 4. Get Answers By Question ID (Crucial for Frontend)
    static async getAnswersByQuestionId(questionId: number): Promise<IAnswer[]> {
        const request = new sql.Request();
        const result = await request
            .input('questionId', sql.Int, questionId)
            .execute('sp_QuestionAnswers_GetByQuestionId');
        
        return result.recordset;
    }

    // 5. Update Answer
    static async updateAnswer(id: number, data: IUpdateAnswerDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        // Note: isCorrect is boolean. If false is passed, ISNULL checks might be tricky in raw SQL 
        // but our SP handles BIT correctly usually. 
        // However, in JS, `false || null` returns null. 
        // We need explicit checking for boolean values.
        
        const isCorrectParam = data.isCorrect !== undefined ? data.isCorrect : null;

        const result = await request
            .input('answerId', sql.Int, id)
            .input('questionId', sql.Int, data.questionId || null)
            .input('isCorrect', sql.Bit, isCorrectParam) 
            .input('answerText', sql.VarChar(sql.MAX), data.answerText || null)
            .execute('sp_QuestionAnswers_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 6. Delete Answer
    static async deleteAnswer(id: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('answerId', sql.Int, id)
            .execute('sp_QuestionAnswers_Delete');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
}