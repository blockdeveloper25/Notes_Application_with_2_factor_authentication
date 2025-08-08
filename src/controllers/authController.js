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
export const login = async () => {};
export const authStatus = async () => {};
export const logout = async () => {};
export const setup2FA = async () => {};
export const verify2FA = async () => {};
export const reset2FA = async () => {};