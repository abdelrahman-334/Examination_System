// ... existing imports
import { ILoginDTO, ILoginResponse, IRegisterInstructorDTO, IRegisterStudentDTO } from '../types/auth.types';
import sql from '../connections/databaseConnection';
import { ISqlResponse } from '../types/department.types';
import bcrypt from "bcrypt"
import hashPassword from '../utils/hashPassword';
import jwt,{SignOptions} from 'jsonwebtoken'
import { Sign } from 'node:crypto';
export class AuthService {
    
    static async registerStudent(data: IRegisterStudentDTO): Promise<{ success: boolean; message: string }> {
        const hashedPassword = await hashPassword(data.password);

        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), data.userName)
            .input('password', sql.VarChar(255), hashedPassword) 
            .input('email', sql.VarChar(100), data.email)
            .input('firstName', sql.VarChar(50), data.firstName)
            .input('lastName', sql.VarChar(50), data.lastName)
            .input('dateOfBirth', sql.Date, data.dateOfBirth)
            .input('address', sql.VarChar(255), data.address)
            .input('deptNo', sql.Int, data.deptNo)
            .input('enrolmentDate', sql.Date, data.enrolmentDate)
            .execute('sp_Register_Student');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 2. REGISTER INSTRUCTOR 
        static async registerInstructor(data: IRegisterInstructorDTO): Promise<{ success: boolean; message: string }> {
    
        const hashedPassword = await hashPassword(data.password);

        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), data.userName)
            .input('password', sql.VarChar(255), hashedPassword) 
            .input('email', sql.VarChar(100), data.email)
            .input('firstName', sql.VarChar(50), data.firstName)
            .input('lastName', sql.VarChar(50), data.lastName)
            .input('dateOfBirth', sql.Date, data.dateOfBirth)
            .input('address', sql.VarChar(255), data.address)
            .input('deptNo', sql.Int, data.deptNo)
            .input('degree', sql.VarChar(50), data.degree)
            .input('salary', sql.Decimal(10, 2), data.salary)
            .execute('sp_Register_Instructor');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 3. LOGIN 
    static async login(data: ILoginDTO): Promise<ILoginResponse & { token?:string }> {
        const request = new sql.Request();

        const result = await request
            .input('userName', sql.VarChar(50), data.userName)
            .execute('sp_Auth_GetUserByUsername');

        const userRecord = result.recordset[0];

        if (!userRecord) {
            return { success: false, message: 'Invalid username or password' };
        }

        const isMatch = await bcrypt.compare(data.password, userRecord.password);

        if (!isMatch) {
            return { success: false, message: 'Invalid username or password' };
        }

        const secret = process.env.JWT_SECRET as string || ""
        const expires = process.env.JWT_EXPIRES_IN || "1d"
        const payload = { 
                userName: userRecord.userName, 
                role: userRecord.role, 
                deptNo: userRecord.deptNo 
            };
        const token = jwt.sign(
            payload
             ,
            secret
            ,
            {expiresIn : expires } as SignOptions
            );

        return {
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                userName: userRecord.userName,
                firstName: userRecord.firstName,
                lastName: userRecord.lastName,
                role: userRecord.role,
                deptNo: userRecord.deptNo
            }
        };
    }
}