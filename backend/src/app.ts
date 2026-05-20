import express from 'express';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';

const app = express();
app.use(cors());
app.use(express.json());

// Protect all routes below this middleware, except those explicitly marked public if we wanted.
// Or we can just use the middleware and protect specific routes with requireAuth.
app.use(clerkMiddleware());

// Public Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Protected Route Example
app.get('/api/account', requireAuth(), (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Authenticated endpoint reached',
    // @ts-ignore - The auth object is injected by Clerk
    userId: req.auth.userId
  });
});

export default app;
