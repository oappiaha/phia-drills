import { Router, Request, Response } from 'express';
import pool from '../db/pool';

const router = Router();

// DRILL 3 EXPRESS: implement the following 5 endpoints.
// Database and seed data are set up for you.
// Run: npm run migrate && npm run seed && npm run dev

// GET /products
// → return all active products
// Bonus: support ?category=bags filter
// Bonus: support ?active=false to include inactive ones

// GET /products/:id
// → return one product
// → 404 if not found

// POST /products
// Body: { name, price, category, stock? }
// → 400 if name, price, or category is missing
// → 400 if price is not a positive number
// → 201 with created product

// PATCH /products/:id
// Body: any subset of { name, price, stock, category, active }
// → 400 if body is empty
// → 404 if not found
// → 200 with updated product
// Hint: build the SET clause dynamically from the body keys

// DELETE /products/:id
// → 204 if deleted
// → 404 if not found

export default router;
