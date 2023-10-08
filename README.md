# Pitchlabs Discord Bot

Welcome to Pitchlabs Community Bot!

## Getting Started

1. **Setup Your Environment:**

   - Create a `.env` file by copying the provided `.env.example`. Fill in the variables with the values obtained after creating your bot.

2. **Create Your Discord Bot:**

   - Visit [Discord Developer Portal](https://discord.com/developers/applications) and click on `New Application`.
   - Navigate to the `Bot` tab:
     - Turn off `PUBLIC BOT` to restrict bot access.
     - Enable `Privileged Gateway Intents` for enhanced functionality.
   - Go to `OAuth2` tab and generate a URL:
     - Under `SCOPES`, choose `bot` and `applications.commands`.
     - Under `BOT PERMISSIONS`, choose `Administrator`.
     - Copy the generated URL and either paste it in your browser, or directly into your Discord server then click on it.

3. **Add Bot Token to .env:**

   - In your `.env` file, add the obtained `DISCORD_BOT_TOKEN` from the `Bot` tab. Click on `Reset Token` and then `copy` to get the token value.

4. **Install Dependencies:**

   - Ensure you have [Node.js](https://nodejs.org/en) installed.
   - Install required packages by running:
     ```bash
     npm install
     ```

5. **Start Your Bot:**
   - Launch your bot with:
     ```bash
     npm start
     ```
   - If you're developing, use `npm run dev` to enable development mode.

## Documentation and Resources

- Explore Discord's official documentation: [Discord Docs](https://discord.com/developers/docs/intro)
- Dive into the Discord.js guide: [Discord.js Guide](https://discordjs.guide/#before-you-begin)

Feel free to reach out if you have any questions or need assistance. Let's make our Discord experience even more exciting! 🎉
