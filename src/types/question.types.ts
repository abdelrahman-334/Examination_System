export interface IQuestion {
    questionID: number;
    courseId: number;
    difficulty: string;
    questionText: string;
    questionGrade: number;
}

export interface ICreateQuestionDTO {
    courseId: number;
    difficulty: string; 
    questionText: string;
    questionGrade: number;
}

export interface IUpdateQuestionDTO {
    courseId?: number;
    difficulty?: string;
    questionText?: string;
    questionGrade?: number;
}