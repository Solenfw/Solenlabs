// api/news.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. We use process.env here (Node.js backend), NOT import.meta.env (React frontend)
    // 2. We use the exact name you set in Vercel's dashboard
    const apiKey = process.env.SECRET_NEWS_API_KEY; 
    
    if (!apiKey) {
      return res.status(500).json({ error: "Missing API Key on Vercel Server" });
    }

    const response = await fetch(`https://newsapi.org/v2/everything?q=science&apiKey=${apiKey}`);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error("News API Error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}