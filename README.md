# Pitchlabs Discord Bot

Welcome to the Pitchlabs Community Bot! 🚀

## Getting Started

### 1. **Create Discord Bot:**

- Head over to the [Discord Developer Portal](https://discord.com/developers/applications) and click on `New Application`.
- Move to the `Bot` tab:
  - Turn off `PUBLIC BOT` to restrict bot access.
  - Enable `Privileged Gateway Intents` for enhanced functionality.
- Navigate to the `OAuth2` tab and generate a URL:
  - Under `SCOPES`, select `bot` and `applications.commands`.
  - In `BOT PERMISSIONS`, choose `Administrator`.
  - Copy the generated URL and either paste it in your browser or directly into your Discord server. Click on the link to invite your bot.

### 2. **Set Up Your Environment:**

- Start by creating a `.env` file. You can use the provided `.env.example` as a template. Then fill in the variables with the necessary values.

  - `DISCORD_BOT_TOKEN` is obtained from the `Bot` tab. Click on `Reset Token` and then `copy` to get the token value.

### 3. **Install Dependencies:**

- Ensure you have [Node.js](https://nodejs.org/en) installed on your system.
- Install the required packages by running:
  ```bash
  npm install
  ```
- For production, use: `npm install --production`.

### 4. **Start Your Bot:**

- Launch your bot in development mode:
  ```bash
  npm run dev
  ```
- For production, use: `npm start`.

## Key Points to Remember

- Inside the `/features` directory, there are files that are automatically executed using the `initializeFeatures` function in `index.js`.
  These files are essential for expanding the bot's functionality. Each feature should be contained within its own file, making it easier to manage and maintain the bot's capabilities.

  - **Adding New Features:**
    If you want to add a new feature to the bot, create a new JavaScript file in the `/features` directory. The content of this file should look like this:

    ```javascript
    export const initialize = () => {
      // Your feature logic goes here
    };
    ```

    Inside the `initialize` function, write the code for your new feature. This is where you'll define what the feature does and how it interacts with your Discord bot.

- **Creating New Commands:**
  To create a new command for the bot, follow these steps:

  1. **Add Command to `commandList.js`:**
     Inside the `/commands` directory, locate the `commandList.js` file. Add a new entry to the `commands` array with the format:

     ```javascript
     {
       name: 'commandName',
       description: 'Description of the command, maximum 100 characters.',
     }
     ```

     Replace `'commandName'` with the actual name of your command and provide a brief description.

  2. **Create Command Handler File:**
     Inside the `/commandHandlers` directory, create a new JavaScript file with the same name as your command (e.g., `commandName.js`).
  3. **Implement Command Logic:**
     In the newly created command handler file, implement the logic for your command. Export an asynchronous function with the same name as the file (e.g., `commandName`) that accepts the `interaction` object as a parameter. Here's an example structure:

     ```javascript
     const commandName = async (interaction) => {
       // Command logic goes here
     };

     export default commandName;
     ```

     Implement the desired functionality of your command within the `commandName` function.

  The bot dynamically handles incoming commands based on the registered commands in `commandList.js`. There is no need to modify the core code for each new command. Ensure the command in `commandList.js` matches the filename in `commandHandlers` to maintain consistency.

## Documentation and Resources

- Explore Discord's official documentation: [Discord Docs](https://discord.com/developers/docs/intro)
- Dive into the Discord.js guide: [Discord.js Guide](https://discordjs.guide/#before-you-begin)

Feel free to reach out if you have any questions or need assistance. Let's make our Discord experience even more exciting! 🎉
