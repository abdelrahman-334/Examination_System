import { Request, Response } from 'express';
import { TopicService } from '../services/topicService';
import { ICreateTopicDTO } from '../types/topic.types';

export class TopicController {

    static async create(req: Request, res: Response) {
        try {
            const data: ICreateTopicDTO = req.body;

            if (!data.topicId || !data.topicName || !data.courseId) {
                return res.status(400).json({ message: 'Topic ID, Name, and Course ID are required' });
            }

            const result = await TopicService.createTopic(data);
            
            if (!result.success) {
                return res.status(409).json(result); 
            }

            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error creating topic', error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const topics = await TopicService.getAllTopics();
            res.json(topics);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching topics', error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const topic = await TopicService.getTopicById(id);

            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }

            res.json(topic);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching topic', error: error.message });
        }
    }

    static async getByCourse(req: Request, res: Response) {
        try {
            const courseId = parseInt(req.params.courseId);
            const topics = await TopicService.getTopicsByCourseId(courseId);
            res.json(topics);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching topics', error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await TopicService.updateTopic(id, req.body);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating topic', error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await TopicService.deleteTopic(id);

            if (!result.success) {
                if (result.message.includes('Dependent')) {
                    return res.status(409).json(result); // Cannot delete if questions exist
                }
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting topic', error: error.message });
        }
    }
}