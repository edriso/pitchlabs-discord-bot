import client from '../bot.js';

export default function welcome() {
  client.on('guildMemberAdd', (member) => {
    const introductionChannel = member.guild.channels.cache.find(
      (channel) => channel.name === 'introduction',
    );

    if (introductionChannel) {
      introductionChannel.send(
        `Welcome to the server, ${member}! Please introduce yourself here.`,
      );

      member.send(
        'Welcome to the server! Please check out the #rules channel and #general channel for more information.',
      );
    } else {
      console.log('Introduction channel not found.');
    }
  });
}
