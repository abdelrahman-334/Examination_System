import { Request, Response } from 'express';
import { PhoneService } from '../services/phoneService';
import { IAddPhoneDTO, IUpdatePhoneDTO } from '../types/phone.types';

export class PhoneController {

    // GET /api/phones (Get MY phones)
    static async getMyPhones(req: Request, res: Response) {
        try {
            const user = req.user as any; // Get logged in user
            const phones = await PhoneService.getPhonesByUser(user.userName);
            res.json(phones);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching phones', error: error.message });
        }
    }

    // POST /api/phones
    static async addPhone(req: Request, res: Response) {
        try {
            const user = req.user as any;
            const data: IAddPhoneDTO = req.body;

            if (!data.phoneNumber) return res.status(400).json({ message: 'Phone number is required' });

            const result = await PhoneService.addPhone(user.userName, data);
            
            if (!result.success) return res.status(409).json(result); // Duplicate
            res.status(201).json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error adding phone', error: error.message });
        }
    }

    // PUT /api/phones
    static async updatePhone(req: Request, res: Response) {
        try {
            const user = req.user as any;
            const data: IUpdatePhoneDTO = req.body;

            if (!data.oldPhoneNumber || !data.newPhoneNumber) {
                return res.status(400).json({ message: 'Old and New phone numbers are required' });
            }

            const result = await PhoneService.updatePhone(user.userName, data);
            
            if (!result.success) return res.status(404).json(result);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error updating phone', error: error.message });
        }
    }

    // DELETE /api/phones/:phoneNumber
    static async deletePhone(req: Request, res: Response) {
        try {
            const user = req.user as any;
            const phoneNumber = req.params.phoneNumber;

            const result = await PhoneService.deletePhone(user.userName, phoneNumber);
            
            if (!result.success) return res.status(404).json(result);
            res.json(result);

        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting phone', error: error.message });
        }
    }
}