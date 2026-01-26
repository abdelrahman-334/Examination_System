import sql  from '../connections/databaseConnection';
import { IInstructorProfile, IUpdateInstructorDTO } from '../types/user.types';
import { ISqlResponse } from '../types/department.types';
import { IRegisterInstructorDTO } from '../types/auth.types';
import { AuthService } from './authService';
import hashPassword from '../utils/hashPassword';
import { IInstructorStatsItem } from '../types/report.types';

export class InstructorService {
    
    static async createInstructor(data: IRegisterInstructorDTO): Promise<{ success: boolean; message: string }> {
    
            return await AuthService.registerInstructor(data);
    }

    static async getAllInstructors(): Promise<IInstructorProfile[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Instructor_GetAll');
        return result.recordset;
    }

    static async getInstructorStats(instructorUserName: string): Promise<IInstructorStatsItem[]> {
        const request = new sql.Request();
        const result = await request
            .input('instructorUserName', sql.VarChar(50), instructorUserName)
            .execute('sp_Report_GetInstructorStats');
        return result.recordset;
    }

    static async getInstructorByUsername(userName: string): Promise<IInstructorProfile | null> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_Instructor_GetById');
        return result.recordset[0] || null;
    }

    static async updateInstructor(userName: string, data: IUpdateInstructorDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        let hashedPassword = null;
        if (data.password) {
            hashedPassword = await hashPassword(data.password)
        }

        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('password', sql.VarChar(255), hashedPassword)
            .input('email', sql.VarChar(100), data.email || null)
            .input('firstName', sql.VarChar(50), data.firstName || null)
            .input('lastName', sql.VarChar(50), data.lastName || null)
            .input('address', sql.VarChar(255), data.address || null)
            .input('deptNo', sql.Int, data.deptNo || null)
            .input('degree', sql.VarChar(50), data.degree || null)
            .input('salary', sql.Decimal(10, 2), data.salary || null)
            .execute('sp_Instructor_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    static async deleteInstructor(userName: string): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_Instructor_Delete');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
}