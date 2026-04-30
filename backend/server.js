import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import auth from './routes/auth.js';


dotenv.config({path: '.env.local'});
await connectDB(); // Call the async function
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.PUBLIC_URL,
  credentials: true
}));
app.use(express.json());
// Routes
// Route for authentication
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Hello, Smart Notes API is running!');
}   
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});