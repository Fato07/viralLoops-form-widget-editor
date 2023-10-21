import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // Save the form data to the database
    const result = await prisma.widgetSettings.create({
      data: req.body
    });

    // queue the task to the redis queue
    await redis.lpush('widget-settings-tasks', JSON.stringify(result));


    // Add a background task to the message broker
    
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
