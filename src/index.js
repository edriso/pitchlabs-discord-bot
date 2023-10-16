import dotenv from 'dotenv';
dotenv.config();
import client from './bot.js';
import welcome from './features/welcome.js';

client.on('ready', () => console.log(`${client.user.tag} is online.`));

// Features
welcome();

client.login(process.env.DISCORD_BOT_TOKEN);
