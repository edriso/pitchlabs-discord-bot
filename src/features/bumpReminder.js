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
    const lastBumpRecord = await Bump.findOne({});
    const currentTime = Date.now();
    if (
      !lastBumpRecord ||
      currentTime - lastBumpRecord.bumpedAt >= BUMP_COOLDOWN_DURATION
    ) {
      client.guilds.cache.forEach(async (guild) => {
        const selectedChannel = guild.channels.cache.find(
          (channel) =>
            channel.type === ChannelTypes.GUILD_TEXT &&
            channel.name === ChannelNames.GENERAL,
        );

        if (selectedChannel) {
          selectedChannel.send(`**Time to bump the server**`);
        } else {
          console.error(
            `${ChannelNames.GENERAL} channel not found in ${guild.name}.`,
          );
        }
      });
    }
  });
};
