import { Request, Response } from 'express';
import { initDB } from '../db';
import { Beer } from '../types/beer';

export type BeerInput = Omit<Beer, 'id'>;

// Récupérer toutes les bières
export const getAllBeers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await initDB();
  const beers: Beer[] = await db.all('SELECT * FROM beers');
  res.json(beers);
};

// Récupérer une bière par ID
export const getBeerById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const db = await initDB();
  const beer: Beer | undefined = await db.get(
    'SELECT * FROM beers WHERE id = ?',
    req.params.id
  );
  if (!beer) {
    res.status(404).json({ error: 'Beer not found' });
    return;
  }
  res.json(beer);
};

// Ajouter une nouvelle bière
export const addBeer = async (req: Request, res: Response): Promise<void> => {
  const { name, alcohol, price, rating } = req.body;
  const db = await initDB();
  const result = await db.run(
    'INSERT INTO beers (name, alcohol, price, rating) VALUES (?, ?, ?, ?)',
    [name, alcohol, price, rating]
  );
  res.status(201).json({ id: result.lastID });
};

// Mettre à jour une bière
export const updateBeer = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { name, alcohol, price, rating } = req.body;
  const db = await initDB();
  const result = await db.run(
    'UPDATE beers SET name = ?, alcohol = ?, price = ?, rating = ? WHERE id = ?',
    [name, alcohol, price, rating, req.params.id]
  );
  res.json({ updated: result.changes });
};

// Supprimer une bière
export const deleteBeer = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const db = await initDB();
  const result = await db.run('DELETE FROM beers WHERE id = ?', req.params.id);
  res.json({ deleted: result.changes });
};
