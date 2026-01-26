import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';
import { IRegisterStudentDTO } from '../types/auth.types';
import { AuthService } from '../services/authService';

export class StudentController {
    
    static async create(req: Request, res: Response) {
        try {
            const data: IRegisterStudentDTO = req.body;
            
            // Basic Validation
            if (!data.userName || !data.password || !data.deptNo) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const result = await StudentService.createStudent(data);
            
            if (!result.success) {
                return res.status(409).json(result); // 409 Conflict (Username exists)
            }
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating student', error: error.message });
        }
    }

    static async getStudentsByDept(req: Request, res: Response) {
        try {
            const deptNo = parseInt(req.params.deptNo);
            const data = await StudentService.getStudentsByDepartment(deptNo);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching report', error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const students = await StudentService.getAllStudents();
            res.json(students);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching students', error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const student = await StudentService.getStudentByUsername(req.params.userName);
            if (!student) return res.status(404).json({ message: 'Student not found' });
            res.json(student);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching student', error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await StudentService.updateStudent(req.params.userName, req.body);
            if (!result.success) return res.status(404).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating student', error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const result = await StudentService.deleteStudent(req.params.userName);
            if (!result.success) return res.status(409).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting student', error: error.message });
        }
    }
}