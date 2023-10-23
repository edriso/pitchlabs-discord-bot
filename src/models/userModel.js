import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  repeatedMessageCount: {
    type: Number,
    default: 0,
  },
  lastMessageContent: {
    type: String,
  },
  lastMessageTimestamp: {
    type: Date,
    default: Date.now(),
  },
  muteCount: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
