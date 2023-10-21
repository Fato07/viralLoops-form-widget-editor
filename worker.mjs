import { Redis } from '@upstash/redis';
import { config } from 'dotenv';
config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

async function processTasks() {
  while (true) {

    const task = await redis.lmove('widget-settings-tasks', 'widget-settings-tasks-processing', 'right', 'left');

    if (task) {
      console.log(task);

      // Process the form data, e.g., generate the HTML widget

    }
  }
}

processTasks();
