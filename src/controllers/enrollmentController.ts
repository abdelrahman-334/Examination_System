import { Request, Response } from 'express';
import { EnrollmentService } from '../services/enrollmentService';
import { IEnrollmentDTO } from '../types/enrollment.types';

export class EnrollmentController {

    // POST /api/enrollments/student
    static async enrollStudent(req: Request, res: Response) {
        try {
            const result = await EnrollmentService.enrollStudent(req.body);
            if (!result.success) return res.status(409).json(result);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error enrolling student', error: error.message });
        }
    }

    static async updateStudentEnrollment(req: Request, res: Response) {
        try {
            const { oldCourseId, newCourseId } = req.body;
            
            if (!oldCourseId || !newCourseId) {
                return res.status(400).json({ message: 'oldCourseId and newCourseId are required' });
            }

            const result = await EnrollmentService.updateStudentEnrollment(req.params.userName, { 
                oldCourseId, 
                newCourseId 
            });

            if (!result.success) return res.status(404).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating enrollment', error: error.message });
        }
    }

    // GET /api/enrollments/student/:userName
    static async getStudentCourses(req: Request, res: Response) {
        try {
            const data = await EnrollmentService.getStudentCourses(req.params.userName);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching courses', error: error.message });
        }
    }

    // GET /api/enrollments/course/:courseId/students
    static async getCourseStudents(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const data = await EnrollmentService.getStudentsInCourse(courseId);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching class roster', error: error.message });
        }
    }

    // DELETE /api/enrollments/student/:userName/course/:courseId
    static async deleteStudentEnrollment(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const result = await EnrollmentService.deleteStudentEnrollment(req.params.userName, courseId);
            if (!result.success) return res.status(404).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error un-enrolling student', error: error.message });
        }
    }

    // ----------------------------------------------------

    // POST /api/enrollments/instructor
    static async assignInstructor(req: Request, res: Response) {
        try {
            const result = await EnrollmentService.assignInstructor(req.body);
            if (!result.success) return res.status(409).json(result);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error assigning instructor', error: error.message });
        }
    }

    // GET /api/enrollments/instructor/:userName
    static async getInstructorCourses(req: Request, res: Response) {
        try {
            const data = await EnrollmentService.getInstructorCourses(req.params.userName);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching teaching schedule', error: error.message });
        }
    }

    // DELETE /api/enrollments/instructor/:userName/course/:courseId
    static async deleteInstructorAssignment(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const result = await EnrollmentService.deleteInstructorAssignment(req.params.userName, courseId);
            if (!result.success) return res.status(404).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error removing instructor', error: error.message });
        }
    }

    static async getCourseInstructors(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const data = await EnrollmentService.getInstructorsInCourse(courseId);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching course instructors', error: error.message });
        }
    }
}