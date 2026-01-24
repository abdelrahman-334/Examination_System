import sql from '../connections/databaseConnection';
import { ICreateTopicDTO, ITopic, IUpdateTopicDTO } from '../types/topic.types';
import { ISqlResponse } from '../types/department.types';

export class TopicService {
    
    // 1. Create Topic
    static async createTopic(data: ICreateTopicDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('topicId', sql.Int, data.topicId)
            .input('topicName', sql.VarChar(100), data.topicName)
            .input('topicDesc', sql.VarChar(sql.MAX), data.topicDesc || null)
            .input('courseId', sql.Int, data.courseId)
            .execute('sp_Topic_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 2. Get All Topics
    static async getAllTopics(): Promise<ITopic[]> {
        const request = new sql.Request();
        const result = await request.execute('sp_Topic_GetAll');
        return result.recordset;
    }

    // 3. Get Topic by ID
    static async getTopicById(id: number): Promise<ITopic | null> {
        const request = new sql.Request();
        const result = await request
            .input('topicId', sql.Int, id)
            .execute('sp_Topic_GetById');

        return result.recordset[0] || null;
    }

    static async getTopicsByCourseId(courseId: number): Promise<ITopic[]> {
        const request = new sql.Request();
        const result = await request
            .input('courseId', sql.Int, courseId)
            .execute('sp_Report_GetCourseTopics');
        return result.recordset;
    }

    // 4. Update Topic
    static async updateTopic(id: number, data: IUpdateTopicDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('topicId', sql.Int, id)
            .input('topicName', sql.VarChar(100), data.topicName || null)
            .input('topicDesc', sql.VarChar(sql.MAX), data.topicDesc || null)
            .input('courseId', sql.Int, data.courseId || null)
            .execute('sp_Topic_Update');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 5. Delete Topic
    static async deleteTopic(id: number): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('topicId', sql.Int, id)
            .execute('sp_Topic_Delete');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    
}