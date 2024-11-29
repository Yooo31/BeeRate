import express from 'express';
import cors from 'cors';
import {
  getAllBeers,
  getBeerById,
  addBeer,
  updateBeer,
  deleteBeer,
} from './controllers/beerController';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get('/beers', getAllBeers);
app.get('/beers/:id', getBeerById);
app.post('/beers', addBeer);
app.put('/beers/:id', updateBeer);
app.delete('/beers/:id', deleteBeer);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
