import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initTestDB = async () => {
  return open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });
};
