'use client';

import { useEffect, useState } from 'react';
import { fetchBeers } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const getBeers = async () => {
      const data = await fetchBeers();
      setBeers(data);
    };

    getBeers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">BeeRate 🍻</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beers.map((beer) => (
          <Card key={beer.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/beer/${beer.id}`} className="hover:underline">
                  {beer.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Alcohol: {beer.alcohol}%</p>
              <p>Price: ${beer.price}</p>
              <p>Rating: ⭐ {beer.rating}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
