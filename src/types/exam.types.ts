export interface IExam {
    ExamNo: number;
    courseId: number;
    examDuration: number;
    noOfQuestions: number;
    examDate: string;
    totalGrade: number;
}

export interface IExamQuestionItem {
    ExamNo: number;
    questionId: number;
    questionText: string;
    questionGrade: number;
    difficulty: string;
}

// DTO for the Generator
export interface IGenerateExamDTO {
    courseId: number;
    examDuration: number; // Minutes
    noOfQuestions: number;
    examDate: string;     // "YYYY-MM-DD"
    totalGrade?: number;
}

// DTO for Manually Adding a Question to an existing Exam
export interface IAddQuestionToExamDTO {
    questionId: number;
}

// The raw row from SQL (Flat)
export interface IExamPaperRow {
    questionId: number;
    questionText: string;
    questionGrade: number;
    difficulty: string;
    answerId: number;
    answerText: string;
    isCorrect?: boolean; // Optional, only present in Instructor view
}

// The clean nested structure for Frontend
export interface IExamPaperQuestion {
    questionId: number;
    questionText: string;
    questionGrade: number;
    difficulty: string;
    answers: {
        answerId: number;
        answerText: string;
        isCorrect?: boolean;
    }[];
}