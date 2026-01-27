import sql from '../connections/databaseConnection';
import { 
    IEnrollmentDTO, IUpdateEnrollmentDTO, 
    IStudentCourseView, ICourseStudentView, 
    IInstructorCourseView, ICourseInstructorView 
} from '../types/enrollment.types';
import { ISqlResponse } from '../types/department.types';

export class EnrollmentService {
    
    // 1. Enroll Student
    static async enrollStudent(data: IEnrollmentDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), data.userName)
            .input('courseId', sql.Int, data.courseId)
            .execute('sp_StudentCourse_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 2. Get Courses a Student is taking
    static async getStudentCourses(userName: string): Promise<IStudentCourseView[]> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_StudentCourse_GetByStudent');
        return result.recordset;
    }

    // 3. Get Students in a Course 
    static async getStudentsInCourse(courseId: number): Promise<ICourseStudentView[]> {
        const request = new sql.Request();
        const result = await request
            .input('courseId', sql.Int, courseId)
            .execute('sp_StudentCourse_GetByCourse');
        return result.recordset;
    }

    // 4. Update Student Enrollment 
    static async updateStudentEnrollment(userName: string, data: IUpdateEnrollmentDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('oldCourseId', sql.Int, data.oldCourseId)
            .input('newCourseId', sql.Int, data.newCourseId)
            .execute('sp_StudentCourse_Update');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 5. Un-enroll Student
    static async deleteStudentEnrollment(userName: string, courseId: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('courseId', sql.Int, courseId)
            .execute('sp_StudentCourse_Delete');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
    // 6. Assign Instructor
    static async assignInstructor(data: IEnrollmentDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), data.userName)
            .input('courseId', sql.Int, data.courseId)
            .execute('sp_InstructorCourse_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 7. Get Courses an Instructor teaches
    static async getInstructorCourses(userName: string): Promise<IInstructorCourseView[]> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_InstructorCourse_GetByInstructor');
        return result.recordset;
    }

    // 8. Get Instructors for a Course
    static async getInstructorsInCourse(courseId: number): Promise<ICourseInstructorView[]> {
        const request = new sql.Request();
        const result = await request
            .input('courseId', sql.Int, courseId)
            .execute('sp_InstructorCourse_GetByCourse');
        return result.recordset;
    }

    // 9. Remove Instructor Assignment
    static async deleteInstructorAssignment(userName: string, courseId: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('courseId', sql.Int, courseId)
            .execute('sp_InstructorCourse_Delete');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
}