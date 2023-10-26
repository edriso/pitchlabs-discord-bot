import { BUMP_COOLDOWN_DURATION } from '../../config/constants.js';

let lastBumpTimestamp = null;

export const handleBumpInteraction = async (interaction) => {
  const currentTimestamp = Date.now();
  if (
    !lastBumpTimestamp ||
    currentTimestamp - lastBumpTimestamp >= BUMP_COOLDOWN_DURATION
  ) {
    lastBumpTimestamp = currentTimestamp;
    interaction.reply('Server successfully bumped!');
  } else {
    interaction.reply(
      `Sorry, the server was already bumped. Please wait ${
        BUMP_COOLDOWN_DURATION / (1000 * 60)
      } minutes from the last bump.`,
    );
  }
};
