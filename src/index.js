import dotenv from 'dotenv';
dotenv.config();
import { Client, IntentsBitField } from 'discord.js';
import welcome from './features/welcome.js';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => console.log(`${client.user.tag} is online.`));

// Features
welcome(client);

client.login(process.env.DISCORD_BOT_TOKEN);
