import sql from '../connections/databaseConnection';
import { ICreateDepartmentDTO, IDepartment, ISqlResponse } from '../types/department.types';

export class DepartmentService {
    
    static async createDepartment(data: ICreateDepartmentDTO): Promise<number> {
        const request = new sql.Request();

        const result = await request
            .input('deptName', sql.VarChar(50), data.deptName)
            .input('deptLoc', sql.VarChar(50), data.deptLoc || null)
            .input('deptDesc', sql.VarChar(50), data.deptDesc || null)
            .execute('sp_Department_Insert');

        return result.recordset[0].DeptNo;
    }

    static async getAllDepartments(): Promise<IDepartment[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Department_GetAll');
        return result.recordset;
    }

    static async getDepartmentById(id: number): Promise<IDepartment | null> {
        const request = new sql.Request();
        const result = await request
            .input('deptNo', sql.Int, id)
            .execute('sp_Department_GetById');

        return result.recordset[0] || null;
    }

    static async updateDepartment(id: number, data: ICreateDepartmentDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('deptNo', sql.Int, id)
            .input('deptName', sql.VarChar(50), data.deptName)
            .input('deptLoc', sql.VarChar(50), data.deptLoc || null)
            .input('deptDesc', sql.VarChar(50), data.deptDesc || null)
            .execute('sp_Department_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        
        return { 
            success: response.Success === 1, 
            message: response.Message 
        };
    }

    static async deleteDepartment(id: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('deptNo', sql.Int, id)
            .execute('sp_Department_Delete');
            
        const response = result.recordset[0] as ISqlResponse;

        return { 
            success: response.Success === 1, 
            message: response.Message 
        };
    }
}