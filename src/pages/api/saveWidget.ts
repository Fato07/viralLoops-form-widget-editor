import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const redis = Redis.fromEnv();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { fields, fontSettings, submitButton, extraFields } = req.body;
    const dataToSave = {
        fieldSettings: fields,
        fontSettings: fontSettings,
        submitButton: submitButton,
        extraFields: extraFields
    };
  
  console.log('dataToSave', dataToSave);
    try {
        const result = await prisma.widgetSettingsData.create({
            data: dataToSave
        });

          // add the task to the redis queue
        await redis.lpush('widget-settings-tasks', JSON.stringify(result));

        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}
