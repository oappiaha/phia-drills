import express from 'express';
import dotenv from 'dotenv';
import postsRouter from './routes/posts';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/posts', postsRouter);
app.use('/users', postsRouter);  // shares router for /users/:userId/posts

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
