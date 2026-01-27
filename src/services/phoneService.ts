import sql from '../connections/databaseConnection';
import { IAddPhoneDTO, IUpdatePhoneDTO, IUserPhone } from '../types/phone.types';
import { ISqlResponse } from '../types/department.types';

export class PhoneService {
    
    // 1. Add Phone
    static async addPhone(userName: string, data: IAddPhoneDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('phoneNumber', sql.VarChar(20), data.phoneNumber)
            .execute('sp_UserPhones_Insert');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 2. Get Phones by User
    static async getPhonesByUser(userName: string): Promise<IUserPhone[]> {
        const request = new sql.Request();
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .execute('sp_UserPhones_GetByUser');
        
        return result.recordset;
    }

    // 3. Update Phone (Change number)
    static async updatePhone(userName: string, data: IUpdatePhoneDTO): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();
        
        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('oldPhoneNumber', sql.VarChar(20), data.oldPhoneNumber)
            .input('newPhoneNumber', sql.VarChar(20), data.newPhoneNumber)
            .execute('sp_UserPhones_Update');

        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }

    // 4. Delete Phone
    static async deletePhone(userName: string, phoneNumber: string): Promise<{ success: boolean; message: string }> {
        const request = new sql.Request();

        const result = await request
            .input('userName', sql.VarChar(50), userName)
            .input('phoneNumber', sql.VarChar(20), phoneNumber)
            .execute('sp_UserPhones_Delete');
            
        const response = result.recordset[0] as ISqlResponse;
        return { success: response.Success === 1, message: response.Message };
    }
}