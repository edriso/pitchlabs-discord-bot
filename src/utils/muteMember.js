import { MUTE_DURATION } from '../config/constants.js';

const muteMember = async (member, reason) => {
  try {
    await member.timeout(MUTE_DURATION, reason);
  } catch (error) {
    console.error(`Error while trying to mute ${member.user.username}`, error);
  }
};

export default muteMember;
