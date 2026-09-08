import { MongoClient } from 'mongodb';

let cachedClient = null;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || process.env.VITE_MONGODB_URI || '';
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside your Vercel Dashboard.');
  }
  
  if (cachedClient) {
    return cachedClient;
  }
  
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // Enable CORS for seamless frontend requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DATABASE || 'harmoniq_db');
    const collection = db.collection('user_likes');

    const { userId } = req.query;

    if (req.method === 'GET') {
      if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
      }
      const doc = await collection.findOne({ userId });
      return res.status(200).json(doc || { userId, likedIds: [], likedSongs: [] });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const { likedIds = [], likedSongs = [], userId: bodyUserId } = req.body;
      const targetUser = bodyUserId || userId;
      
      if (!targetUser) {
        return res.status(400).json({ error: 'Missing userId in request' });
      }

      await collection.updateOne(
        { userId: targetUser },
        { $set: { userId: targetUser, likedIds, likedSongs, updatedAt: new Date() } },
        { upsert: true }
      );

      return res.status(200).json({ success: true, userId: targetUser, likedCount: likedIds.length });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('MongoDB Serverless API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
