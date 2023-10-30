import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import client from '../bot.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(
  process.env.DISCORD_BOT_TOKEN,
);

const commands = [
  {
    name: 'bump',
    description: 'Bump the server to the top.',
  },
  {
    name: 'library',
    description: 'Enter a world of information for successful business.',
  },
];

const registerCommands = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand() || !interaction.isButton) return;

      const commandName = interaction.commandName;

      try {
        const { default: commandHandler } = await import(
          `./commandHandlers/${commandName}.js`
        );
        await commandHandler(interaction);
      } catch (error) {
        console.error(`Error handling command ${commandName}:`, error);
      }
    });
  } catch (error) {
    console.log('Error while registering commands', error);
  }
};

export default registerCommands;
