import Bump from '../models/bumpModel.js';

const upsertBumpRecord = async () => {
  try {
    // update or create a new record with the current timestamp
    await Bump.findOneAndUpdate({}, { bumpedAt: Date.now() }, { upsert: true });
  } catch (error) {
    console.error('Error updating bump record:', error);
  }
};

export default upsertBumpRecord;
