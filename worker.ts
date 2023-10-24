const { Redis } = require('@upstash/redis');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Register a custom helper for Handlebars
// handlebars.registerHelper('eq', (a: any, b: any) => a === b);

// Register 'switch' helper
handlebars.registerHelper('switch', function(this:any, value: any, options: any) {
  this._switch_value_ = value;
  const html = options.fn(this); // Process the body of the switch block
  delete this._switch_value_;
  return html;
});

// Register 'case' helper
handlebars.registerHelper('case', function(this:any, value: any, options: any) {
  if (value == this._switch_value_) {
      return options.fn(this);
  }
});

async function processTasks() {
  while (true) {
    const task = await redis.lmove('widget-settings-tasks', 'widget-settings-tasks-processing', 'right', 'left');

    if (task) {
      const widgetSettingsData = task;

      // Load the Handlebars template
      const templateSoure = fs.readFileSync(path.join(__dirname, '/templates/widget.handlebars'), 'utf-8');
      const template = handlebars.compile(templateSoure);

      console.log('widgetSettingsData', widgetSettingsData);
      
      // Render the HTML using the widgetSettings data
      const html = template(widgetSettingsData);
      console.log(html);

      // Save the generated HTML to a file in the templates folder
      fs.writeFileSync(path.join(__dirname, `/public/widgets/${widgetSettingsData.id}.html`), html);
    }
  }
}

processTasks();
