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
    ExamNo: number;       // Manual ID for the exam
    courseId: number;
    examDuration: number; // Minutes
    noOfQuestions: number;
    examDate: string;     // "YYYY-MM-DD"
    totalGrade: number;
}

// DTO for Manually Adding a Question to an existing Exam
export interface IAddQuestionToExamDTO {
    questionId: number;
}