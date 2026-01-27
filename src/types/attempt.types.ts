export interface IAttempt {
    attemptId: number;
    userName: string;
    examNo: number;
    attemptDate: string;
    score: number | null; 
}

export interface IStartExamDTO {
    examNo: number;
}

export interface ISubmitAnswerDTO {
    attemptId: number;
    questionId: number;
    selectedAnswerId: number;
}

export interface IUpdateAnswerDTO {
    attemptId: number;
    questionId: number;
    newAnswerId: number;
}

export interface IFinishExamDTO {
    attemptId: number;
}