import cron from 'node-cron';
import client from '../bot.js';
import { ChannelTypes, ChannelNames } from '../config/constants.js';

export const initialize = () => {
  cron.schedule('0 */2 * * *', () => {
    //   cron.schedule('*/3 * * * * *', () => {// each 3s
    client.guilds.cache.forEach((guild) => {
      const generalChannel = guild.channels.cache.find(
        (channel) =>
          channel.type === ChannelTypes.GUILD_TEXT &&
          channel.name === ChannelNames.GENERAL,
      );

      if (generalChannel) {
        generalChannel.send(`**Time to bump the server**`);
      } else {
        console.error(
          `${ChannelNames.GENERAL} channel not found in ${guild.name}.`,
        );
      }
    });
  });
};
