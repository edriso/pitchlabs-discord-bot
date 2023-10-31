import { BUMP_COOLDOWN_DURATION } from '../../config/constants.js';
import Bump from '../../models/bumpModel.js';

const bump = async (interaction) => {
  try {
    const currentTimestamp = Date.now();
    const lastBumpRecord = await Bump.findOne();

    if (
      !lastBumpRecord ||
      currentTimestamp - lastBumpRecord.bumpedAt >= BUMP_COOLDOWN_DURATION
    ) {
      // update or create a new record with the current timestamp
      await Bump.findOneAndUpdate(
        {},
        { bumpedAt: currentTimestamp },
        { upsert: true },
      );
      interaction.reply('Server successfully bumped!');
    } else {
      interaction.reply({
        content: `Sorry, the server was already bumped. Please wait ${
          BUMP_COOLDOWN_DURATION / (1000 * 60)
        } minutes from the last bump.`,
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error('Error handling bump command:', error);
    interaction.reply({
      content: 'An error occurred while processing your request.',
      ephemeral: true,
    });
  }
};

export default bump;
