import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

//Middleware
app.use(json({limit: '100mb'}));
app.use(urlencoded({ extended: true, limit: '100mb' }));

// Routes


// Listen App
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})