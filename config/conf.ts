import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    requestTimeout: 45000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}
export default config;