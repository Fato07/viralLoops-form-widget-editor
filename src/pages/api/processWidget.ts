import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import { PrismaClient } from '@prisma/client';
import { put } from "@vercel/blob";
import Handlebars from "handlebars";
import { writeFile } from 'fs/promises';
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

const templateString = `<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Modern Form</title>
        <style>
        body {
            font-family: 'Avenir', Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f5f7;
        }

        .container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        }

        .container h1,
        .container p {
            text-align: {{fontSettings.textAlign}};
            color: {{fontSettings.fontColor}};
            font-size: {{fontSettings.fontSize}}px;
            margin: 0;
        }

        input[type="text"],
        input[type="email"] {
            display: block;
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
            transition: border 0.3s;
        }

        input[type="text"]:focus,
        input[type="email"]:focus {
            border: 1px solid #555;
            outline: none;
        }

        button {
            display: block;
            width: 100%;
            padding: 12px;
            background-color: {{submitButton.backgroundColor}};
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #0056b3;
        }

        .required:after {
            content: " *";
            color: red;
        }

         select, 
        input[type="radio"],
        input[type="checkbox"] {
            margin-bottom: 15px;
        }

        select {
        display: block;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 16px;
        transition: border 0.3s;
        background: #fff;
        appearance: none;
        cursor: pointer;
    }

    select:focus {
        border: 1px solid #555;
        outline: none;
    }

    input[type="radio"],
    input[type="checkbox"] {
        margin-right: 8px;
        vertical-align: middle;
    }

    /* Custom Radio Button Styles */
    input[type="radio"] {
        appearance: none;
        width: 16px;
        height: 16px;
        border: 1px solid #ddd;
        border-radius: 50%;
        cursor: pointer;
    }

    input[type="radio"]:checked {
        background-color: #555;
        border-color: #555;
    }

    /* Custom Checkbox Styles */
    input[type="checkbox"] {
        appearance: none;
        width: 16px;
        height: 16px;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
    }

    input[type="checkbox"]:checked {
        background-color: #555;
        border-color: #555;
    }

    input[type="checkbox"]:checked:after {
        content: '✓';
        color: #fff;
        display: block;
        text-align: center;
        font-size: 12px;
        line-height: 16px;
    }

    </style>
    </head>

    <body>
        <div class="container">
            <form action method="post">
                <h1 class="title">{{fieldSettings.title}}</h1>
                <p class="subtitle">{{fieldSettings.subtitle}}</p>

                <input type="text" name="firstName"
                    placeholder="First Name{{#if fieldSettings.firstName.isRequired}} *{{/if}}"
                    {{#if fieldSettings.firstName.isRequired}}required{{/if}}>

                <input type="text" name="lastName"
                    placeholder="Last Name{{#if fieldSettings.lastName.isRequired}} *{{/if}}"
                    {{#if fieldSettings.lastName.isRequired}}required{{/if}}>

                <input type="email" name="email"
                    placeholder="Email*" required>

                {{#each extraFields}}
                {{#switch this.type}}
                {{#case "checkbox"}}
                <label class="{{#if this.required}}required{{/if}}">
                    <input type="checkbox" name="{{this.id}}"
                        required="{{this.required}}"> {{this.label}}
                </label>
                {{/case}}

                {{#case "radio"}}
                <div>
                    {{#each this.options}}
                    <label>
                        <input type="radio" name="{{../this.id}}"
                            value="{{this.value}}"
                            required="{{../this.required}}"> {{this.label}}
                    </label>
                    {{/each}}
                </div>
                {{/case}}

                {{#case "dropdown"}}
                <select name="{{this.id}}" required="{{this.required}}">
                    <option value disabled selected>Select an option</option>
                    {{#each this.options}}
                    <option value="{{this.value}}">{{this.label}}</option>
                    {{/each}}
                </select>
                {{/case}}
                {{/switch}}
                {{/each}}

                <button type="submit"
                    style="background-color: {{submitButton.backgroundColor}};">{{submitButton.text}}</button>
            </form>
        </div>
    </body>

</html>
`
// Register 'case' helper
Handlebars.registerHelper('case', function(this:any, value: any, options: any) {
 if (value == this._switch_value_) {
     return options.fn(this);
 }
});

type Task = {
    id: string,
    fieldSettings: {
        title: string,
        lastName: {
            isRequired: boolean
        },
        subtitle: string,
        firstName: {
            isRequired: boolean
        }
      },
      fontSettings: { fontSize: number, fontColor: string, textAlign: string },
      submitButton: { text: string, backgroundColor: string },
      extraFields: []
    
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    console.log('Processing widget settings task', req.body);
    
    const task : Task = await redis.lmove('widget-settings-tasks', 'widget-settings-tasks-processing', 'right', 'left');

    console.log('task', task);

    if (!task) {
        return res.status(200).send("No tasks to process.");
      }
    
    const filename = `${task.id}.html`;

    // Compile the template with Handlebars
    const template = Handlebars.compile(templateString);
    console.log('widgetSettingsData', task);

    // Render the HTML using the widgetSettings data
    const html = template(task);
    console.log('Renderd HTML', html);

    // Upload the generated HTML to Vercel Blob
    const blob = await put(`widgets/${filename}.html`, html, { access: "public" });
    
    console.log('Uploaded HTML to Vercel Blob', blob);
    const data = {
        blobId: blob,
        widgetSettingsId: task.id
    }
    res.status(200).send({ message: "HTML uploaded successfully", data });

    // make the file accessiible at a public URL
    try {
        const filePath = path.join(process.cwd(), 'public', 'widgets', filename);

        console.log(' Testing to see the filePath', process.cwd());

        // Write the generated HTML to a file in the public/widgets directory
        await writeFile(filePath, html, 'utf8');
        console.log(`File saved to ${filePath}`);

    } catch (err) {
        console.error('Error writing file:', err);
        return res.status(500).send({ message: 'Error writing HTML file.' });
    }

}
