import * as dotenv from 'dotenv'
dotenv.config()

export const db_connection = process.env.MONGODB_CONNECT || ''
