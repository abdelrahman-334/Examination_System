export interface ITopic {
    topicId: number;
    topicName: string;
    topicDesc: string | null;
    courseId: number;
}

export interface ICreateTopicDTO {
    topicId: number; 
    topicName: string;
    topicDesc?: string;
    courseId: number;
}

export interface IUpdateTopicDTO {
    topicName?: string;
    topicDesc?: string;
    courseId?: number;
}