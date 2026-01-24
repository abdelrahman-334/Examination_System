import express from "express"
import dotenvx from "@dotenvx/dotenvx"
import {connectDb} from "./connections/databaseConnection";
import cors from "cors"
import departmentRoutes from "./routes/departmentRoutes";
import authRoutes from "./routes/authRoutes"
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import courseRoutes from "./routes/courseRouter"
const app = express()

const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.use('/api/departments', departmentRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/courses', courseRoutes);


declare global{
    namespace Express{
        interface Request{
            user?: string | JwtPayload;
        }
    }
}

app.get('/', (req, res) => {
    res.send("Response from server");
});

const startServer = async () => {
    try {
        await connectDb(); 
        
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
};

startServer();