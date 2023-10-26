import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import client from '../bot.js';
import { bumpHandler } from './commandHandlers/bump.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(
  process.env.DISCORD_BOT_TOKEN,
);

const commands = [
  {
    name: 'bump',
    description: 'Bump the server to the top.',
  },
];

export const registerCommands = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log('Successfully registered application commands (/).');

    client.on('interactionCreate', async (interaction) => {
      // return if it was not a /slash command
      if (!interaction.isChatInputCommand()) return;

      if (interaction.isButton) {
        if (interaction.commandName === 'bump') {
          await bumpHandler(interaction);
        }
      }
    });
  } catch (error) {
    console.log('Error while registering commands', error);
  }
};
