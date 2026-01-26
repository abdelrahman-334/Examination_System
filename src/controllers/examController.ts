import { Request, Response } from 'express';
import { ExamService } from '../services/examService';
import { IGenerateExamDTO } from '../types/exam.types';

export class ExamController {


    static async create(req: Request, res: Response) {
        try {
            const data: IGenerateExamDTO = req.body;

            if (!data.ExamNo || !data.courseId || !data.noOfQuestions) {
                return res.status(400).json({ message: 'Exam No, Course ID, and Number of Questions are required' });
            }

            const result = await ExamService.createExam(data);
            
            if (!result.success) {
                return res.status(409).json(result); 
            }
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error generating exam', error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const exam = await ExamService.getExamById(examNo);

            if (!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }

            res.json(exam);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching exam', error: error.message });
        }
    }

    // POST /api/exams/generate
    static async generate(req: Request, res: Response) {
        try {
            const data: IGenerateExamDTO = req.body;

            // Basic Validation
            if (!data.ExamNo || !data.courseId || !data.noOfQuestions) {
                return res.status(400).json({ message: 'Exam No, Course ID, and Number of Questions are required' });
            }

            const result = await ExamService.generateExam(data);
            
            if (!result.success) {
                return res.status(409).json(result); 
            }
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error generating exam', error: error.message });
        }
    }

    // GET /api/exams
    static async getAll(req: Request, res: Response) {
        try {
            const exams = await ExamService.getAllExams();
            res.json(exams);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching exams', error: error.message });
        }
    }

    // GET /api/exams/:examNo/questions
    static async getQuestions(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const questions = await ExamService.getExamQuestions(examNo);
            res.json(questions);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching exam questions', error: error.message });
        }
    }

    // POST /api/exams/:examNo/questions (Manual Add)
    static async addQuestion(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const { questionId } = req.body;

            if (!questionId) return res.status(400).json({ message: 'Question ID required' });

            const result = await ExamService.addQuestionToExam(examNo, questionId);
            
            if (!result.success) return res.status(409).json(result);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error adding question', error: error.message });
        }
    }

    // DELETE /api/exams/:examNo/questions/:questionId (Manual Remove)
    static async removeQuestion(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const questionId = parseInt(req.params.questionId);

            const result = await ExamService.removeQuestionFromExam(examNo, questionId);
            
            if (!result.success) return res.status(404).json(result);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error removing question', error: error.message });
        }
    }

    // DELETE /api/exams/:examNo (Delete Exam)
    static async delete(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const result = await ExamService.deleteExam(examNo);
            
            if (!result.success) return res.status(404).json(result);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting exam', error: error.message });
        }
    }

    // DELETE /api/exams/:examNo/questions
    static async removeAllQuestions(req: Request, res: Response) {
        try {
            const examNo = parseInt(req.params.examNo);
            const result = await ExamService.removeAllQuestionsFromExam(examNo);
            
            if (!result.success) return res.status(404).json(result);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error clearing exam questions', error: error.message });
        }
    }
}