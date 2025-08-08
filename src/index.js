import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

//Middleware
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(json({limit: '100mb'}));
app.use(urlencoded({ extended: true, limit: '100mb' }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
        maxAge:  60 * 60 * 1000, // session expires after 1 hour
    },

}))
app.use(passport.initialize());
app.use(passport.session())


// Routes


// Listen App
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})