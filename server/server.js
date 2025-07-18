import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';

import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDB()
const app = express()
// Enable Cross-Origin data sharing
app.use(cors()) 

// Middlewware

app.use(express.json());
app.use(clerkMiddleware())

// Api to listen to clerk
app.use('/api/clerk',clerkWebhooks);

app.get('/',(req,res) => res.send("Api is working.."))
const  PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT} `));