import cron from 'node-cron';
import client from '../bot.js';
import {
  ChannelTypes,
  ChannelNames,
  BUMP_COOLDOWN_DURATION,
} from '../config/constants.js';
import Bump from '../models/bumpModel.js';

export const initialize = () => {
  cron.schedule('0 */1 * * *', async () => {
    // cron.schedule('*/3 * * * * *', async () => {// each 3s
    const lastBumpRecord = await Bump.findOne({});
    const currentTime = Date.now();
    if (
      !lastBumpRecord ||
      currentTime - lastBumpRecord.bumpedAt >= BUMP_COOLDOWN_DURATION
    ) {
      client.guilds.cache.forEach(async (guild) => {
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
    }
  });
};
