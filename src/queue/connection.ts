import { Redis } from "ioredis";
import "dotenv/config";

export const connection = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    
    maxRetriesPerRequest: null,
})