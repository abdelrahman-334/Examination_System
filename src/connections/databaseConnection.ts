import sql from "mssql"
import dotenvx from "@dotenvx/dotenvx"

dotenvx.config();

const sqlConfig = {
 user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || '.\SQLEXPRESS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: false // change to true for local dev / self-signed certs
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
