import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const register = async (req, res)=> {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            isMfaActive: false,
            twoFactorSecret: null, // I have added this field to store the 2FA secret
        });
        console.log("New User:", newUser);

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: 'Error registering user', message: error});
        
    }
};
export const login = async (req, res) => {
    console.log("The authenticated user is:", req.user);
    res.status(200).json({
        message: 'Login successful',
        username: req.user.username,
        isMfaActive: req.user.isMfaActive,
        
    });
};
export const authStatus = async (req, res) => {
    if (req.user){
        res.status(200).json({
            message: 'User is authenticated',
            username: req.user.username,
            isMfaActive: req.user.isMfaActive,
        });

    } else{
        res.status(401).json({message: 'User is not authenticated'});
    }
};
export const logout = async (req , res) => {
    if (!req.user) res.status(401).json({message: 'User is not authenticated'});
    req.logout((err) => {
            if (err) {
                return res.status(400).json({message: 'User Not Logged in'});

            }
            res.status(200).json({message: 'User logged out successfully'});
        })
    
};
export const setup2FA = async () => {};
export const verify2FA = async () => {};
export const reset2FA = async () => {};