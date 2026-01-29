import { Request, Response } from 'express';
import { AttemptService } from '../services/attemptService';
import { IStartExamDTO, ISubmitAnswerDTO, IUpdateAnswerDTO } from '../types/attempt.types';

export class AttemptController {

    // POST /api/attempts/start
    static async startExam(req: Request, res: Response) {
        try {
            // Get username from Token (Middleware)
            const user = req.user as any; 
            const data: IStartExamDTO = req.body;

            if (!data.examNo) return res.status(400).json({ message: 'Exam Number is required' });

            const result = await AttemptService.startExam(user.userName, data);
            
            if (!result.success) return res.status(400).json(result);
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error starting exam', error: error.message });
        }
    }

    // POST /api/attempts/answer
    static async submitAnswer(req: Request, res: Response) {
        try {
            const data: ISubmitAnswerDTO = req.body;
            
            if (!data.attemptId || !data.questionId || !data.selectedAnswerId) {
                return res.status(400).json({ message: 'Missing fields' });
            }

            const result = await AttemptService.submitAnswer(data);
            if (!result.success) return res.status(400).json(result); 
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error saving answer', error: error.message });
        }
    }

    // PUT /api/attempts/answer
    static async changeAnswer(req: Request, res: Response) {
        try {
            const data: IUpdateAnswerDTO = req.body;
            const result = await AttemptService.changeAnswer(data);
            if (!result.success) return res.status(404).json(result);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating answer', error: error.message });
        }
    }

    // POST /api/attempts/finish
    static async finishExam(req: Request, res: Response) {
        try {
            const { attemptId } = req.body;
            if (!attemptId) return res.status(400).json({ message: 'Attempt ID required' });

            const result = await AttemptService.finishExam(attemptId);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error grading exam', error: error.message });
        }
    }

    // GET /api/attempts/history
    static async getHistory(req: Request, res: Response) {
        try {
            const user = req.user as any;
            const history = await AttemptService.getStudentAttempts(user.userName);
            res.json(history);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching history', error: error.message });
        }
    }

    static async getStudentExamAnswers(req: Request, res: Response) {
        try {
            const attemptId = parseInt(req.params.attemptId);
            const data = await AttemptService.getStudentExamAnswers(attemptId);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching exam results', error: error.message });
        }
    }

    static async getExamAttempts(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const attempts = await AttemptService.getExamAttempts(examNo);
            res.json(attempts);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching exam attempts', error: error.message });
        }
    }
}