export interface ILoginDTO {
    userName: string;
    password: string;
}

export interface ILoginResponse {
    success: boolean;
    message: string;
    user?: {
        userName: string;
        firstName: string;
        lastName: string;
        role: string; 
        deptNo: number;
    };
}

// Base fields for any user
interface IBaseUserDTO {
    userName: string;
    password: string; // Plain text (will be hashed later if you add logic)
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO Date string
    address: string;
    deptNo: number;
}

// 1. DTO for Registering a Student
export interface IRegisterStudentDTO extends IBaseUserDTO {
    enrolmentDate: string;
}

// 2. DTO for Registering an Instructor
export interface IRegisterInstructorDTO extends IBaseUserDTO {
    degree: string;
    salary: number;
}