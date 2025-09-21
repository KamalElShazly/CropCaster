import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_Name;
const pricesCollectionName = process.env.MONGODB_PRICES_COLLECTION_NAME;
let client = null;

async function connectToDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db(dbName);
}

export default async function handler(req, res) {
  try {
    const db = await connectToDB();
    const data = await db.collection(pricesCollectionName).find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
