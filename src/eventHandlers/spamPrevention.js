import User from '../models/userModel.js';
import { SPAM_THRESHOLD, BAN_THRESHOLD } from '../config/constants.js';
import banMember from '../utils/banMember.js';
import muteMember from '../utils/muteMember.js';

const getUser = async (userId) => {
  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId });
  }
  return user;
};

const checkRepeatedMessage = (user, messageContent) => {
  const isRepeated = user.lastMessageContent === messageContent;
  user.repeatedMessageCount = isRepeated ? user.repeatedMessageCount + 1 : 1;
  user.lastMessageTimestamp = Date.now();
  user.lastMessageContent = messageContent;
  user.save();
  return isRepeated;
};

const checkSameMessages = async (channel, messageContent) => {
  const lastMessages = await channel.messages.fetch({ limit: SPAM_THRESHOLD });
  return lastMessages.every((msg) => msg.content === messageContent);
};

export default {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    const user = await getUser(message.author.id);
    const isRepeated = checkRepeatedMessage(user, message.content);

    if (!isRepeated) return;

    if (user.repeatedMessageCount >= SPAM_THRESHOLD) {
      const isSameMessage = await checkSameMessages(
        message.channel,
        message.content,
      );

      if (isSameMessage) {
        if (user.muteCount >= BAN_THRESHOLD) {
          return banMember(message.member, 'Excessive spamming');
        }

        await muteMember(message.member, 'Muted for spamming');
        user.muteCount += 1;
        user.repeatedMessageCount = 0;
        await user.save();
      }
    }
  },
};
