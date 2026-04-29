import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';


dotenv.config({path: '.env.local'});
await connectDB(); // Call the async function
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.PUBLIC_URL,
    credentials: true
    }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Smart Notes API is running!');
}   
);

app.post('/test', (req, res) => {
    const body = req.body;
    console.log('Received data:', body);
  const { name } = body;
  res.json({success: true, message: `Hello, ${name}! This is a test endpoint.` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});