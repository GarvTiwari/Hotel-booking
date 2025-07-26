// import express from 'express'
// import "dotenv/config";
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express';
// import clerkWebhooks from './controllers/clerkWebhooks.js';

// connectDB();
// const app = express();
// // Enable Cross-Origin data sharing
// app.use(cors());

// // Middlewware

// // app.use(express.json());
// app.use(clerkMiddleware())

// // Api to listen to clerk Webhook
// // app.use('/api/clerk',clerkWebhooks);
// app.use('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

// app.use(express.json());

// app.get('/',(req,res) => res.send("Api is working.."))
// const  PORT = process.env.PORT || 3000;
// app.listen(PORT,()=>console.log(`Server running on PORT ${PORT} `));









//  Chatgpt code /


// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import User from "./models/User.js";

// connectDB();
// const app = express();

// app.use(cors());

// // app.use(clerkMiddleware());

// // app.use(express.json());

// app.post(
//   "/api/clerk",
//   express.raw({ type: "application/json" }),
//   clerkWebhooks
// );

// app.use(express.json());
// app.use(clerkMiddleware());

// app.get("/", (req, res) => res.send("API is working..."));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT,  () => 
//     {
//         console.log(`Server running on port ${PORT}`)
//     });






import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDB();
const app = express();

// Enable CORS
app.use(cors());

// ✅ Webhook raw body parser must come BEFORE json parser
app.use('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

// ✅ Then parse normal JSON for all other routes
app.use(express.json());

// ✅ Clerk auth middleware
app.use(clerkMiddleware());

// ✅ Test route
app.get('/', (req, res) => res.send("API is working.."));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
