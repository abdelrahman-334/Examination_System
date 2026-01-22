import { Request, Response } from 'express';
import { DepartmentService } from '../services/departmentService';
import { ICreateDepartmentDTO } from '../types/department.types';

export class DepartmentController {

    static async create(req: Request, res: Response) {
        try {
            const departmentData: ICreateDepartmentDTO = req.body;

            if (!departmentData.deptName) {
                return res.status(400).json({ message: 'Department Name is required' });
            }

            const newId = await DepartmentService.createDepartment(departmentData);
            
            res.status(201).json({ 
                success: true, 
                message: 'Department created successfully', 
                deptNo: newId 
            });

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating department', error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const departments = await DepartmentService.getAllDepartments();
            res.json(departments);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching departments', error: error.message });
        }
    }

    // GET /api/departments/:id
    static async getById(req: Request, res: Response) {
        try {
             if(typeof req.params.id !== 'string' || isNaN(parseInt(req.params.id))) {
                return res.status(400).json({ message: 'Invalid Department ID' });
            }
            const id = parseInt(req.params.id);
            const department = await DepartmentService.getDepartmentById(id);

            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }

            res.json(department);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching department', error: error.message });
        }
    }

    // PUT /api/departments/:id
    static async update(req: Request, res: Response) {
        try {
            
            if(typeof req.params.id !== 'string' || isNaN(parseInt(req.params.id))) {
                return res.status(400).json({ message: 'Invalid Department ID' });
            }

            const id = parseInt(req.params.id);
            
            const departmentData: ICreateDepartmentDTO = req.body;

            if (!departmentData.deptName) {
                return res.status(400).json({ message: 'Department Name is required' });
            }

            const result = await DepartmentService.updateDepartment(id, departmentData);

            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }

            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error updating department', error: error.message });
        }
    }

    // DELETE /api/departments/:id
    static async delete(req: Request, res: Response) {
        try {
             if(typeof req.params.id !== 'string' || isNaN(parseInt(req.params.id))) {
                return res.status(400).json({ message: 'Invalid Department ID' });
            }
            const id = parseInt(req.params.id);
            
            const result = await DepartmentService.deleteDepartment(id);

            if (!result.success) {
                // If message contains "Dependent", it's a conflict (409)
                if (result.message.includes('Dependent')) {
                    return res.status(409).json(result);
                }
                return res.status(404).json(result);
            }

            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting department', error: error.message });
        }
    }
}