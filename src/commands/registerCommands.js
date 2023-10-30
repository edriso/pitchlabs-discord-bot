import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import client from '../bot.js';
import { handleBumpInteraction } from './commandHandlers/handleBumpInteraction.js';

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

const registerCommands = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.isButton && interaction.commandName === 'bump') {
        await handleBumpInteraction(interaction);
      }
    });
  } catch (error) {
    console.log('Error while registering commands', error);
  }
};

export default registerCommands;
