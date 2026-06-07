import { Router, Request, Response } from 'express';
import pool from '../db/pool';

const router = Router();

// DRILL: implement the following 4 endpoints.
// The database and seed data are already set up for you.
// Run: npm run migrate && npm run seed && npm run dev

// GET /orders
// → return all orders
// Bonus: support ?status=pending filter

// GET /orders/:id
// → return one order
// → 404 if not found

// POST /orders
// Body: { customer, total, status? }
// → 400 if customer or total missing
// → 201 with created order

// DELETE /orders/:id
// → 204 if deleted
// → 404 if not found
// Use a transaction for this one

export default router;
