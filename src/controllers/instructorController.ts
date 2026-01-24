import { Request, Response } from 'express';
import { InstructorService } from '../services/instructorService';
import { AuthService } from '../services/authService';
import { IRegisterInstructorDTO } from '../types/auth.types';

export class InstructorController {
    


    // 1. CREATE (Delegate to AuthService)
    static async create(req: Request, res: Response) {
        try {
            const data: IRegisterInstructorDTO = req.body;
            
            // Basic Validation
            if (!data.userName || !data.password || !data.deptNo) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const result = await InstructorService.createInstructor(data);
            
            if (!result.success) {
                return res.status(409).json(result);
            }
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating instructor', error: error.message });
        }
    }

    
    static async getAll(req: Request, res: Response) {
        try {
            const Instructors = await InstructorService.getAllInstructors();
            res.json(Instructors);
        } catch (error: any) {
            res.status(500).json({ message: 'Instructor fetching students', error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const Instructor = await InstructorService.getInstructorByUsername(req.params.userName);
            if (!Instructor) return res.status(404).json({ message: 'Instructor not found' });
            res.json(Instructor);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching student', error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await InstructorService.updateInstructor(req.params.userName, req.body);
            if (!result.success) return res.status(404).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating Instructor', error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const result = await InstructorService.deleteInstructor(req.params.userName);
            if (!result.success) return res.status(409).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting Instructor', error: error.message });
        }
    }
}