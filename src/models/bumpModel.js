import mongoose from 'mongoose';

const bumpSchema = new mongoose.Schema({
  bumpedAt: {
    type: Date,
    default: null,
  },
});

const Bump = mongoose.model('Bump', bumpSchema);

export default Bump;
