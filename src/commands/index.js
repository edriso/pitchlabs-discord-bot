import client from '../bot.js';
import { registerSlashCommands } from './commandHandlers/registerSlashCommands.js';
import { handleBumpInteraction } from './commandHandlers/handleBumpInteraction.js';

const commands = [
  {
    name: 'bump',
    description: 'Bump the server to the top.',
  },
];

const registerCommands = async () => {
  try {
    await registerSlashCommands(commands);
    console.log('Successfully registered application commands (/).');

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
