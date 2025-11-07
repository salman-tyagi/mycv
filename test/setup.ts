import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config({ path: '.env.test' });

export const resetDatabase = async () => {
  const { DB } = process.env;

  if (!DB) {
    throw new Error('DB environment variable is not defined');
  }

  const client = new MongoClient(DB);

  try {
    const DB_NAME = DB.split('/').at(-1);

    await client.connect();
    await client.db(DB_NAME).dropDatabase();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
