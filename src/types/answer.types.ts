export interface IAnswer {
    answerId: number;
    questionId: number;
    isCorrect: boolean;
    answerText: string;
}

export interface ICreateAnswerDTO {
    answerId: number; // Manual ID
    questionId: number;
    isCorrect: boolean;
    answerText: string;
}

export interface IUpdateAnswerDTO {
    questionId?: number;
    isCorrect?: boolean;
    answerText?: string;
}