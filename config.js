import dotenv from 'dotenv';
dotenv.config(); 

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME
};

export default config;
