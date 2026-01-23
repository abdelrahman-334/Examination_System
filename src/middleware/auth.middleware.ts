import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

export const authenticateToken = (req:Request,res:Response,next: NextFunction) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({message:"Access denied"})
    }

    try{
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token,secret)
    

        req.user = decoded;
        next();
    }
    catch(e){
                return res.status(403).json({ message: 'Invalid or Expired Token' });
    }
}

export const requireRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as any;
        
        if (user && user.role === role) {
            next();
        } else {
            res.status(403).json({ message: `Access Denied: Requires ${role} role` });
        }
    };
};
