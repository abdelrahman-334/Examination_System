import sql  from '../connections/databaseConnection';
import { IStudentProfile, IUpdateStudentDTO } from '../types/user.types';
import { ISqlResponse } from '../types/department.types';
import { AuthService } from './authService';
import { IRegisterStudentDTO } from '../types/auth.types';
import hashPassword from '../utils/hashPassword';
import { IStudentReportItem } from '../types/report.types';

export class StudentService {

    static async createStudent(data: IRegisterStudentDTO): Promise<{ success: boolean; message: string }> {

        return await AuthService.registerStudent(data);
    }
    
    // Get All
    static async getAllStudents(): Promise<IStudentProfile[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Student_GetAll');
        return result.recordset;
    }

    static async getStudentsByDepartment(deptNo: number): Promise<IStudentReportItem[]> {
        const request = new sql.Request();
        const result = await request
            .input('deptNo', sql.Int, deptNo)
            .execute('sp_Report_GetStudentsByDepartment');
        return result.recordset;
    }

    // Get By ID
    static async getStudentByUsername(userName: string): Promise<IStudentProfile | null> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_Student_GetById');
        return result.recordset[0] || null;
    }

    // Update (Only updates Student-specific fields like enrolmentDate)
    static async updateStudent(userName: string, data: IUpdateStudentDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        // LOGIC: If password is provided, Hash it. If not, send NULL.
        let hashedPassword = null;
        if (data.password) {
            hashedPassword = await hashPassword(data.password);
        }

        const result = await request
            .input('userName', sql.VarChar(50), userName)
            // User Fields
            .input('password', sql.VarChar(255), hashedPassword) // Send Hash or Null
            .input('email', sql.VarChar(100), data.email || null)
            .input('firstName', sql.VarChar(50), data.firstName || null)
            .input('lastName', sql.VarChar(50), data.lastName || null)
            .input('address', sql.VarChar(255), data.address || null)
            .input('deptNo', sql.Int, data.deptNo || null)
            // Student Fields
            .input('enrolmentDate', sql.Date, data.enrolmentDate || null)
            .execute('sp_Student_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }


    // Delete (Cascades to SystemUser)
    static async deleteStudent(userName: string): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_Student_Delete');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
}