import dotenv from 'dotenv';

dotenv.config();

const { PORT, MONGO_CLIENT, MONGO_PASSWORD, MONGO_DB_NAME }  = process.env;
const MONGO_DB_CONNECTION_URL =
    `mongodb+srv://${MONGO_CLIENT}:${MONGO_PASSWORD}@cluster0.ihcgo.mongodb.net/${MONGO_DB_NAME}`;

export const config = {
    mongo: {
        url: MONGO_DB_CONNECTION_URL
    },
    server: {
        port: PORT
    }
};
