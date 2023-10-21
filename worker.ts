const { Redis } = require('@upstash/redis');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function processTasks() {
  while (true) {
    const task = await redis.lmove('widget-settings-tasks', 'widget-settings-tasks-processing', 'right', 'left');

    if (task) {
      const widgetSettings = task;
      const template = fs.readFileSync(path.join(__dirname, '/templates/widget.ejs'), 'utf-8');

      // Render the HTML using the widgetSettings data
      // Note: You need to require 'ejs' to use the 'ejs.render' function
      const html = ejs.render(template, widgetSettings);
      console.log(widgetSettings);

      // Save the generated HTML to a file in the templates folder
      fs.writeFileSync(path.join(__dirname, `/public/widgets/${widgetSettings.id}.html`), html);
    }
  }
}

processTasks();
