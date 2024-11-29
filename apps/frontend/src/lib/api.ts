import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const fetchBeers = async () => {
  const response = await axios.get(`${API_URL}/beers`);
  return response.data;
};

export const addBeer = async (beer: any) => {
  const response = await axios.post(`${API_URL}/beers`, beer);
  return response.data;
};

export const deleteBeer = async (id: string) => {
  const response = await axios.delete(`${API_URL}/beers/${id}`);
  return response.data;
};

export const updateBeer = async (id: string, beer: any) => {
  const response = await axios.put(`${API_URL}/beers/${id}`, beer);
  return response.data;
};
