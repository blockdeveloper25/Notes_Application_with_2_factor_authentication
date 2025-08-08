import {Router} from 'express';
import passport  from 'passport';

const router = Router();

//Registration Route
router.post('/register', register);
// Login Route
router.post('login',login)
// Auth Status Route
router.get('/auth-status', authStatus)
// Logout Route
router.get('/logout', logout)

// 2FA setup
router.get('/2fa/setup', setup2FA)

// 2FA verify
router.post('/2fa/verify', verify2FA)

// Reset 2FA
router.post('/2fa/reset', reset2FA)

export default router;

