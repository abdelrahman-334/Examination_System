import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';
import { ICreateQuestionDTO } from '../types/question.types';

export class QuestionController {

    // POST /api/questions
    static async create(req: Request, res: Response) {
        try {
            const data: ICreateQuestionDTO = req.body;

            // Basic Validation
            if (!data.questionId || !data.courseId || !data.questionText) {
                return res.status(400).json({ message: 'Question ID, Course ID, and Text are required' });
            }

            const result = await QuestionService.createQuestion(data);
            
            if (!result.success) {
                return res.status(409).json(result); // 409 Conflict (Duplicate ID)
            }
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating question', error: error.message });
        }
    }

    // GET /api/questions
    static async getAll(req: Request, res: Response) {
        try {
            const questions = await QuestionService.getAllQuestions();
            res.json(questions);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching questions', error: error.message });
        }
    }

    // GET /api/questions/:id
    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const question = await QuestionService.getQuestionById(id);

            if (!question) {
                return res.status(404).json({ message: 'Question not found' });
            }

            res.json(question);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching question', error: error.message });
        }
    }

    // PUT /api/questions/:id
    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await QuestionService.updateQuestion(id, req.body);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating question', error: error.message });
        }
    }

    // DELETE /api/questions/:id
    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await QuestionService.deleteQuestion(id);

            if (!result.success) {
                if (result.message.includes('Dependent')) {
                    return res.status(409).json(result); // Cannot delete if used in Exams/Answers
                }
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting question', error: error.message });
        }
    }
}