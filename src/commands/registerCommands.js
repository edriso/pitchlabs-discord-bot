import { REST, Routes } from 'discord.js';
import client from '../bot.js';
import { commands } from './commandList.js';

const registerCommands = async () => {
  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_BOT_TOKEN,
  );

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
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
