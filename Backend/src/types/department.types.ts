export interface IDepartment {
    deptNo: number;
    deptName: string;
    deptLoc: string | null;
    deptDesc: string | null;
}

export interface ICreateDepartmentDTO {
    deptName: string;
    deptLoc?: string;
    deptDesc?: string;
}

export interface ISqlResponse {
    Success: number; // 1 or 0
    Message: string;
    DeptNo?: number; // Only present on Insert
}