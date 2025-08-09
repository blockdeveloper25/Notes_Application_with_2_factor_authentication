import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error });
  }
};
export const login = async (req, res) => {
  console.log("The authenticated user is:", req.user);
  res.status(200).json({
    message: "Login successful",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User is authenticated",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
};
export const logout = async (req, res) => {
  if (!req.user) res.status(401).json({ message: "User is not authenticated" });
  req.logout((err) => {
    if (err) {
      return res.status(400).json({ message: "User Not Logged in" });
    }
    res.status(200).json({ message: "User logged out successfully" });
  });
};
export const setup2FA = async (req, res) => {
  try {
    console.log("Setting up 2FA for user:", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret is:", secret);
    user.twoFactorSecret = secret.base32; // Store the secret in the user's document
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.sujairibrahim.com",
      encoding: "base32",
    });
    const qrImageUrl = await QRCode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      QRCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Error setting up 2FA", message: error });
  }
};
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token,
  });
  if (verified) {
    const jwtTocken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({message:"2FA Successful", token: jwtTocken})
  } else {
    res.status(400).json({message: "Invalid 2FA Token"})
  }
};
export const reset2FA = async (req, res) => {
    try {
        const user = req.user;
        user.twoFactorSecret = "";
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({message: '2FAreset succesfully'})
    } catch (error) {
        res.status(500).json({ error: "Error reseting 2FA", message: error})
    }
};
