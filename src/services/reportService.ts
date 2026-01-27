import sql from '../connections/databaseConnection';
import { IStudentExamResultItem } from '../types/report.types';

export class ReportService {

    static async getStudentExamAnswers(attemptId: number): Promise<IStudentExamResultItem[]> {
        const request = new sql.Request();
        const result = await request
            .input('AttemptId', sql.Int, attemptId)
            // We don't need ExamNo/User here because AttemptId is unique and sufficient
            .execute('sp_Report_GetStudentExamAnswers');
        
        return result.recordset;
    }
}