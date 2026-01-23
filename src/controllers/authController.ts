import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {

    static async registerStudent(req: Request, res: Response) {
        try {

            const result = await AuthService.registerStudent(req.body);
            
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error registering student', error: error.message });
        }
    }

    static async registerInstructor(req: Request, res: Response) {
        try {
            const result = await AuthService.registerInstructor(req.body);
            
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error registering instructor', error: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            
            if (!result.success) {
                return res.status(401).json(result);
            }
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error during login', error: error.message });
        }
    }
}