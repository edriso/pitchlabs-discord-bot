import cron from 'node-cron';
import client from '../bot.js';
import {
  ChannelTypes,
  ChannelNames,
  BUMP_COOLDOWN_DURATION,
  Roles,
} from '../config/constants.js';
import Bump from '../models/bumpModel.js';

export const initialize = () => {
  cron.schedule('*/15 * * * *', async () => {
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
          const adminRole = guild.roles.cache.find(
            (role) => role.name === Roles.ADMIN,
          );
          const message = adminRole
            ? `Hey ${adminRole}, it's time to bump the server! 🚀`
            : `Time to bump the server!`;
          selectedChannel.send(message);
        } else {
          console.error(
            `${ChannelNames.GENERAL} channel not found in ${guild.name}.`,
          );
        }
      });
    }
  });
};
