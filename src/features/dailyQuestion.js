import cron from 'node-cron';
import client from '../bot.js';
import { ChannelTypes, ChannelNames } from '../utils/constants.js';
import { questions } from '../utils/questions.js';

let lastQuestionAsked = '';
const getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};

export const initialize = () => {
  // console.log(`Server Time: ${new Date().toString()}`); // Log the current server time
  // This will run the task every day at 9:00 AM
  cron.schedule('0 9 * * *', () => {
    // cron.schedule('*/3 * * * * *', () => {// each 3 seconds
    client.guilds.cache.forEach((guild) => {
      const generalChannel = guild.channels.cache.find(
        (channel) =>
          channel.type === ChannelTypes.GUILD_TEXT &&
          channel.name === ChannelNames.GENERAL,
      );

      if (generalChannel) {
        let randomQuestion = getRandomQuestion();

        while (randomQuestion === lastQuestionAsked) {
          randomQuestion = getRandomQuestion();
        }
        lastQuestionAsked = randomQuestion;

        generalChannel.send(`**Question of the Day:**\n${randomQuestion}`);
      } else {
        console.error(
          `${ChannelNames.GENERAL} channel not found in ${guild.name}.`,
        );
      }
    });
  });
};
