import sql  from '../connections/databaseConnection';
import { ICreateCourseDTO, ICourse } from '../types/course.types';
import { ISqlResponse } from '../types/department.types'; // Reuse common response type

export class CourseService {
    
    static async createCourse(data: ICreateCourseDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('courseId', sql.Int, data.courseId)
            .input('courseName', sql.VarChar(100), data.courseName)
            .input('courseLength', sql.Int, data.courseLength)
            .execute('sp_Course_Insert');

        // SQL returns: { Success: 1/0, Message: '...' }
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    static async getAllCourses(): Promise<ICourse[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Course_GetAll');
        return result.recordset;
    }

    static async getCourseById(id: number): Promise<ICourse | null> {
        const request = new sql.Request();
        const result = await request
            .input('courseId', sql.Int, id)
            .execute('sp_Course_GetById');

        return result.recordset[0] || null;
    }

    static async updateCourse(id: number, data: Partial<ICreateCourseDTO>): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('courseId', sql.Int, id)
            .input('courseName', sql.VarChar(100), data.courseName || null)
            .input('courseLength', sql.Int, data.courseLength || null)
            .execute('sp_Course_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        
        return { 
            success: response.Success === 1, 
            message: response.Message 
        };
    }

    static async deleteCourse(id: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('courseId', sql.Int, id)
            .execute('sp_Course_Delete');
            
        const response = result.recordset[0] as ISqlResponse;

        return { 
            success: response.Success === 1, 
            message: response.Message 
        };
    }
}