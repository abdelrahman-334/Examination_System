// DTOs for Actions
export interface IEnrollmentDTO {
    userName: string;
    courseId: number;
}

export interface IUpdateEnrollmentDTO {
    oldCourseId: number;
    newCourseId: number;
}

// Read Models (What the DB returns)
export interface IStudentCourseView {
    courseId: number;
    courseName: string;
    courseLength: number;
}

export interface ICourseStudentView {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    enrolmentDate: string;
}

export interface IInstructorCourseView {
    courseId: number;
    courseName: string;
    courseLength: number;
}

export interface ICourseInstructorView {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    degree: string;
}