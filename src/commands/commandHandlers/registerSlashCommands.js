import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(
  process.env.DISCORD_BOT_TOKEN,
);

export const registerSlashCommands = async (commands) => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
    { body: commands },
  );
};
