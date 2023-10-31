import { BUMP_COOLDOWN_DURATION } from '../../config/constants.js';
import Bump from '../../models/bumpModel.js';
import upsertBumpRecord from '../../utils/upsertBumpRecord.js';

const bump = async (interaction) => {
  try {
    const currentTimestamp = Date.now();
    const lastBumpRecord = await Bump.findOne();

    if (
      !lastBumpRecord ||
      currentTimestamp - lastBumpRecord.bumpedAt >= BUMP_COOLDOWN_DURATION
    ) {
      upsertBumpRecord();
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
