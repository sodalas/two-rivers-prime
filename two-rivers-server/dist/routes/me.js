import { Router } from 'express';
import { auth } from '../auth/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
const router = Router();
router.get('/me', async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        res.json({ user: session?.user ?? null });
    }
    catch (error) {
        // Trust Boundary: Log error but do not surface it. Return null user.
        console.error('Error in /api/me:', error);
        res.json({ user: null });
    }
});
export const meRoutes = router;
