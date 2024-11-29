'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchBeers, updateBeer, deleteBeer } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Beer } from '@/types/beer';

export default function BeerDetails({ params }: { params: { id: string } }) {
  const [beer, setBeer] = useState({
    name: '',
    alcohol: '',
    price: '',
    rating: '',
  });
  const router = useRouter();

  useEffect(() => {
    const getBeer = async () => {
      const data = await fetchBeers();
      const selectedBeer = data.find((b: Beer) => b.id === parseInt(params.id));
      if (selectedBeer) {
        setBeer(selectedBeer);
      }
    };
    getBeer();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeer({ ...beer, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateBeer(params.id, {
      name: beer.name,
      alcohol: parseFloat(beer.alcohol),
      price: parseFloat(beer.price),
      rating: parseFloat(beer.rating),
    });
    toast.success('Bière modifiée !');
    router.push('/');
  };

  const handleDelete = async () => {
    await deleteBeer(params.id);
    toast.success('Bière supprimée !');
    router.push('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Beer 🍺</h1>
      <form className="space-y-4">
        <Input
          name="name"
          placeholder="Name"
          value={beer.name}
          onChange={handleChange}
          required
        />
        <Input
          name="alcohol"
          placeholder="Alcohol %"
          type="number"
          value={beer.alcohol}
          onChange={handleChange}
          required
        />
        <Input
          name="price"
          placeholder="Price $"
          type="number"
          value={beer.price}
          onChange={handleChange}
          required
        />
        <Input
          name="rating"
          placeholder="Rating (0-5)"
          type="number"
          value={beer.rating}
          onChange={handleChange}
          required
        />
        <div className="flex space-x-4">
          <Button type="button" onClick={handleUpdate}>
            Update
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
