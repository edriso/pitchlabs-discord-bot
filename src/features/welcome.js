import client from '../bot.js';

export const initialize = () => {
  client.on('guildMemberAdd', (member) => {
    let introductionChannel;
    let generalChannel;
    member.guild.channels.cache.filter((channel) => {
      if (channel.name === 'introduction') introductionChannel = channel;
      if (channel.name === 'general') generalChannel = channel;
    });

    if (introductionChannel) {
      introductionChannel.send(
        `Hello, ${member}! Welcome to the Pitch Labs Community Server.
We're here to cultivate a space where aspiring entrepreneurs can learn the art of crafting new businesses. We're genuinely thrilled to have you here!
Please take a moment to introduce yourself here in the ${introductionChannel} channel. Additionally, kindly share with us in the ${
          generalChannel || 'general'
        } channel why you joined so that we can better assist you on your entrepreneurial journey.
Thank you!`,
      );
    } else {
      console.log('Introduction channel not found.');
    }
  });
};
