import { Request, Response } from 'express';
import { AnswerService } from '../services/answerService';
import { ICreateAnswerDTO } from '../types/answer.types';

export class AnswerController {

    // POST /api/answers
    static async create(req: Request, res: Response) {
        try {
            const data: ICreateAnswerDTO = req.body;

            // Basic Validation
            if (!data.answerId || !data.questionId || !data.answerText) {
                return res.status(400).json({ message: 'Answer ID, Question ID, and Text are required' });
            }

            const result = await AnswerService.createAnswer(data);
            
            if (!result.success) {
                return res.status(409).json(result); 
            }
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating answer', error: error.message });
        }
    }

    // GET /api/answers/question/:questionId
    static async getByQuestion(req: Request, res: Response) {
        try {
            const questionId = parseInt(req.params.questionId);
            const answers = await AnswerService.getAnswersByQuestionId(questionId);
            res.json(answers);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching answers', error: error.message });
        }
    }


    static async getAll(req: Request, res: Response) {
        try {
            const answer = await AnswerService.getAllAnswers(); 

            res.json(answer);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching answer', error: error.message });
        }
    }

    // GET /api/answers/:id
    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const answer = await AnswerService.getAnswerById(id);

            if (!answer) {
                return res.status(404).json({ message: 'Answer not found' });
            }

            res.json(answer);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching answer', error: error.message });
        }
    }

    // PUT /api/answers/:id
    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await AnswerService.updateAnswer(id, req.body);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating answer', error: error.message });
        }
    }

    // DELETE /api/answers/:id
    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await AnswerService.deleteAnswer(id);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting answer', error: error.message });
        }
    }
}