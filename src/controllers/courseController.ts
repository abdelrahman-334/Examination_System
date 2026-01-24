import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';
import { ICreateCourseDTO } from '../types/course.types';

export class CourseController {

    // POST /api/courses
    static async create(req: Request, res: Response) {
        try {
            const data: ICreateCourseDTO = req.body;

            if (!data.courseId || !data.courseName) {
                return res.status(400).json({ message: 'Course ID and Name are required' });
            }

            const result = await CourseService.createCourse(data);
            
            if (!result.success) {
                return res.status(409).json(result); 
            }

            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating course', error: error.message });
        }
    }

    // GET /api/courses
    static async getAll(req: Request, res: Response) {
        try {
            const courses = await CourseService.getAllCourses();
            res.json(courses);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching courses', error: error.message });
        }
    }

    // GET /api/courses/:id
    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const course = await CourseService.getCourseById(id);

            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            res.json(course);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching course', error: error.message });
        }
    }

    // PUT /api/courses/:id
    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await CourseService.updateCourse(id, req.body);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating course', error: error.message });
        }
    }

    // DELETE /api/courses/:id
    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await CourseService.deleteCourse(id);

            if (!result.success) {
                if (result.message.includes('Dependent')) {
                    return res.status(409).json(result); // Conflict (Has Students/Exams)
                }
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting course', error: error.message });
        }
    }
}