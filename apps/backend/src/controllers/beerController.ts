import { Request, Response } from 'express';
import { initDB } from '../db';

export const getAllBeers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const db = await initDB();
  const beers = await db.all('SELECT * FROM beers');
  res.json(beers);
};

export const getBeerById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const db = await initDB();
  const beer = await db.get('SELECT * FROM beers WHERE id = ?', req.params.id);
  if (!beer) {
    return res.status(404).json({ error: 'Beer not found' });
  }
  res.json(beer);
};

export const addBeer = async (req: Request, res: Response): Promise<any> => {
  const { name, alcohol, price, rating } = req.body;
  const db = await initDB();
  const result = await db.run(
    'INSERT INTO beers (name, alcohol, price, rating) VALUES (?, ?, ?, ?)',
    [name, alcohol, price, rating]
  );
  res.status(201).json({ id: result.lastID });
};

export const updateBeer = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const { name, alcohol, price, rating } = req.body;
  const db = await initDB();
  const result = await db.run(
    'UPDATE beers SET name = ?, alcohol = ?, price = ?, rating = ? WHERE id = ?',
    [name, alcohol, price, rating, req.params.id]
  );
  res.json({ updated: result.changes });
};

export const deleteBeer = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<any> => {
  const db = await initDB();
  const result = await db.run('DELETE FROM beers WHERE id = ?', req.params.id);
  res.json({ deleted: result.changes });
};
