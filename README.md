# 🚀 Form Widget Editor 🎨

Welcome to the most fabulous Form Widget Editor in the galaxy! 🌌 Unleash your creativity, customize your form widgets, and watch them come to life in real-time. Built with love, React, TypeScript, Next.js, Chakra UI, and PlanetScale.

![Form Widget Editor Preview](./path-to-your-screenshot.png)  
*Above: A sneak peek of our dazzling editor in action! 🌟*

## 🌈 Features:

- **Dynamic Preview**: What you see is what you get, in real-time!
- **Stylish Sidebar**: Customize titles, subtitles, fonts, and more.
- **Extra Fields**: Add checkboxes, radio buttons, and dropdowns. The more, the merrier!
- **Background Magic**: Our diligent background workers craft the perfect HTML for you.

## 🛠️ Setup & Installation:

1. **Clone the Universe**:
   ```
   git clone https://github.com/Fato07/viralLoops-form-widget-editor.git
   ```
2. **Go into the Universe**:
   ```
   cd form-widget-editor
   ```
3. **Install The Stars**
   ```
   yarn install
   ```
4. **Setup Planet Scale**:
  
   i. Install the PlanetScale CLI: Please refer to the official [documentation](https://github.com/planetscale/cli#installation) depending on your OS.

   ii. Authenticate with PlanetScale:
   ```
   pscale auth login
   ```
   iii. Connect Prisma to your PlanetScale database by setting the `DATABASE_URL` in your `.env file`.

   iv. Push your Prisma schema to PlanetScale:
   ```
   npx prisma db push
   ```

5. **Run the Project**:
   ```
   Yarn dev
   ```
6. Visit the Cosmos: Open your browser and navigate to http://localhost:3000. Witness the magic! 🪄

7. Spin up the background worker:
   
   i. Ensure you have [ts-node](https://www.npmjs.com/package/ts-node) installed and run the following command

   ```
   ts-node -P tsconfig.worker.json worker.ts --watch
   ```

## 🚀 Why This Tech Stack?
 - ### Next.js:
   Provides a seamless development experience with hot-reloading, server-side rendering, and a plethora of plugins.
 - ### Chakra UI:
   For a beautiful and accessible UI without the fuss.
 - ### PlanetScale: 
   A serverless relational database that scales effortlessly with the needs of our application.
 - ###  Prisma:
   An open-source database toolkit that makes it easy to reason about our data and ensures type safety.

 - ### 🌟 Upstash: Redis in the Cloud

   **Why Upstash?**

   Upstash provides a serverless Redis database, which is perfect for our needs. Here's why we chose Upstash:

   Upstash scales automatically with our usage. We don't have to worry about provisioning or managing servers.


   In our Form Widget Editor, we utilize Upstash as a message broker. When a user saves their form widget settings:

## 🧱 Behind the Scenes: How It Works 🕵️‍♂️:
   1. When you customize your widget, the settings are saved to our primary database (PlanetScale).
   2. A message is pushed into a Redis list in Upstash, signaling a background task. Think of this as ringing a bell for our background workers.
   3. The background workers are always listening. When it detects a message, it processes the task, such as generating the HTML widget.
   4. Once the task is complete, the message is removed from the list.

  This architecture ensures that even if there's a sudden surge in users or tasks, our main application remains responsive. The background workers can process tasks at their own pace, and we can easily scale up the number of workers if needed.

## 📝 Notes:
- Don't forget to check out the API routes. They're the unsung heroes behind the scenes.
- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/saveWidget](http://localhost:3000/api/saveWidget). This endpoint can be edited in `pages/api/saveWidget.ts`.

- The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

- Our background workers are always on the lookout for tasks. They love being kept busy!
## 🤝 Contribution:
Feel like adding more sparkle? PRs are welcome! Let's make the universe even more dazzling together! ✨

## 💌 Feedback:
Loved it? Hated it? Feel indifferent? Let us know! Shoot a star ⭐ to this repo or drop us a message.



   

   