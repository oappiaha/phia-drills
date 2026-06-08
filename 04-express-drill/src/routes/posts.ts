import { Router, Request, Response } from 'express';
import pool from '../db/pool';

const router = Router();

// DRILL 4 EXPRESS: implement the following 5 endpoints.
// Two tables. You'll need JOINs for some of these.
// Run: npm run migrate && npm run seed && npm run dev

// GET /posts
// → return all published posts, include the author's name and email
//   (JOIN posts with users)
// Bonus: support ?published=false to get all posts regardless

// GET /posts/:id
// → return one post with author's name and email
// → 404 if not found

// GET /users/:userId/posts
// → return all posts by a specific user
// → 404 if user doesn't exist
// → 200 with empty array if user exists but has no posts

// POST /posts
// Body: { user_id, title, body?, published? }
// → 400 if user_id or title missing
// → 404 if user_id doesn't exist
// → 201 with created post

// PATCH /posts/:id/publish
// → sets published = true on the post
// → 404 if not found
// → 200 with updated post
// (no body needed — this is a dedicated publish action)

export default router;
