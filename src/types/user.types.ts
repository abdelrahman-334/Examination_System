export interface IStudentProfile {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    enrolmentDate: string;
}

export interface IInstructorProfile {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    degree: string;
    salary: number;
}

// Add optional User fields to the Update DTOs

export interface IUpdateStudentDTO {
    // User Fields (Optional)
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    deptNo?: number;
    
    // Student Fields
    enrolmentDate?: string;
}

export interface IUpdateInstructorDTO {
    // User Fields (Optional)
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    deptNo?: number;

    // Instructor Fields
    degree?: string;
    salary?: number;
}


export interface IStudentGradeReport {
    courseName: string;
    ExamNo: number;
    examDate: string;
    StudentScore: number;
    MaxScore: number;
    PercentageGrade: number;
}