'use client';

import { useState } from 'react';
import { addBeer } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AddBeer() {
  const [form, setForm] = useState({
    name: '',
    alcohol: '',
    price: '',
    rating: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBeer({
      name: form.name,
      alcohol: parseFloat(form.alcohol),
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
    });
    router.push('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add a Beer 🍺</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Beer name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="alcohol"
          placeholder="Alcohol %"
          type="number"
          value={form.alcohol}
          onChange={handleChange}
          required
        />
        <Input
          name="price"
          placeholder="Price $"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <Input
          name="rating"
          placeholder="Rating (0-5)"
          type="number"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add Beer</Button>
      </form>
    </div>
  );
}
