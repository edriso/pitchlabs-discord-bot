import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import client from './bot.js';
import connectDB from './db/connect.js';
import spamPrevention from './eventHandlers/spamPrevention.js';
import registerCommands from './commands/registerCommands.js';
import Bump from './models/bumpModel.js';

dotenv.config();

if (!process.env.DISCORD_BOT_TOKEN || !process.env.MONGO_URI) {
  console.error('Required environment variables are missing.');
  process.exit(1);
}

const initializeFeatures = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const featuresPath = path.join(__dirname, 'features');
    const files = fs.readdirSync(featuresPath);
    for (const file of files) {
      if (file.endsWith('.js')) {
        try {
          const modulePath = path.resolve(path.join(featuresPath, file));
          const moduleUrl = `file://${modulePath}`;
          const { initialize } = await import(moduleUrl);
          if (initialize && typeof initialize === 'function') {
            initialize();
          } else {
            console.warn(
              `Feature ${file} does not have a valid initialize function.`,
            );
          }
        } catch (error) {
          if (error.code === 'MODULE_NOT_FOUND') {
            console.warn(`Feature file ${file} not found.`);
          } else {
            console.error(`Error initializing feature ${file}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading features directory:', error);
  }
};

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.error(`Error while connecting to DB:`, error);
  }

  client.on('ready', () => {
    process.env.CLIENT_ID = client.user.id;
    process.env.GUILD_ID = client.guilds.cache.first().id;
    registerCommands();
    initializeFeatures();
    console.log(`${client.user.tag} is online.`);
  });

  client.on('messageCreate', async (message) => {
    spamPrevention.execute(message);
    if (
      message.interaction &&
      message.interaction.commandName === 'bump' &&
      message.interaction.type === 2
    ) {
      try {
        await Bump.findOneAndUpdate(
          {},
          { bumpedAt: Date.now() },
          { upsert: true },
        );
      } catch (error) {
        console.error('Error updating bump record:', error);
      }
    }
  });

  client.on('error', (error) => {
    console.error('The bot encountered an error:', error);
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
})();
