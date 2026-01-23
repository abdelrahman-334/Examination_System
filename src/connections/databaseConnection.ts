import sql from "mssql"
import dotenvx from "@dotenvx/dotenvx"


if(!process.env.PROD){
    dotenvx.config()
}
const sqlConfig = {
 user: process.env.DB_USER || "Backend",
  password: process.env.DB_PWD || "backend123",
  database: process.env.DB_NAME || "ExaminationSystem",
  server: process.env.DB_SERVER || "localhost\\SQLEXPRESS",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' // change to true for local dev / self-signed certs
  }
}


export const connectDb = async () => {
    console.log('Attempting to connect to SQL Server...');
    
    try {
        const pool = await sql.connect(sqlConfig);
        console.log('Connected successfully!');
        return pool
    } catch (err: any) {
        console.error('ERROR OCCURRED:');
        console.error(err.message);
    }
}

export default sql;
