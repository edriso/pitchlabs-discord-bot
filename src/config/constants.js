export const SPAM_THRESHOLD = 5;
export const MUTE_DURATION = 10 * 60 * 1000;
export const BAN_THRESHOLD = 2;

export const BUMP_COOLDOWN_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const ChannelNames = {
  GENERAL: 'general',
  INTRODUCTION: 'introduction',
};

export const ChannelTypes = {
  GUILD_TEXT: 0,
  DM: 1,
  GUILD_VOICE: 2,
  GROUP_DM: 3,
  GUILD_CATEGORY: 4,
  GUILD_ANNOUNCEMENT: 5,
  ANNOUNCEMENT_THREAD: 10,
  PUBLIC_THREAD: 11,
  PRIVATE_THREAD: 12,
  GUILD_STAGE_VOICE: 13,
  GUILD_DIRECTORY: 14,
  GUILD_FORUM: 15,
  GUILD_MEDIA: 16,
};
