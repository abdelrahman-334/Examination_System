export interface IStudentReportItem {
    StudentID: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    enrolmentDate: string;
    deptName: string;
}

export interface IInstructorStatsItem {
    courseId: number;
    courseName: string;
    NumberOfStudents: number;
}

export interface ITopicReportItem {
    topicId: number;
    topicName: string;
    topicDesc: string;
}

export interface IStudentExamResultItem {
    questionText: string;
    questionGrade: number;
    SelectedAnswer: string;
    Result: 'Correct' | 'Incorrect';
    CorrectAnswerText: string;
}