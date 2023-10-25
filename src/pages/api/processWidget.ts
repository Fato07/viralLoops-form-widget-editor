import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import { PrismaClient } from '@prisma/client';
import { put } from "@vercel/blob";
import Handlebars from "handlebars";
import { promises as fs } from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const redis = Redis.fromEnv();

// Register 'switch' helper
Handlebars.registerHelper('switch', function(this:any, value: any, options: any) {
 this._switch_value_ = value;
 const html = options.fn(this); // Process the body of the switch block
 delete this._switch_value_;
 return html;
});

// Register 'case' helper
Handlebars.registerHelper('case', function(this:any, value: any, options: any) {
 if (value == this._switch_value_) {
     return options.fn(this);
 }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 const task = await redis.lmove('widget-settings-tasks', 'widget-settings-tasks-processing', 'right', 'left');

 if (!task) {
  return res.status(200).send("No tasks to process.");
 }

 console.log('FILE PATH', process.cwd());

 const widgetSettingsData = task;
 // Path to the Handlebars template
 // const templatePath = path.join(process.cwd(), 'templates', 'widget.handlebars');
  
 // // Read the template
 // const templateString = fs.readFileSync(templatePath, 'utf8');

 // // Compile the template with Handlebars
 // const template = Handlebars.compile(templateString);





}
