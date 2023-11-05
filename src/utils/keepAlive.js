// awake.mjs
import https from 'https';
import cron from 'node-cron';

export const keepAlive = (appUrl) => {
  cron.schedule('*/10 * * * *', () => {
    try {
      https.get(appUrl, (response) => {
        if (response.statusCode === 200) {
          console.log(`Successfully woke up the server at ${new Date()}`);
        } else {
          console.error(`Failed to wake up the server: ${response.statusCode}`);
        }
      });
    } catch (error) {
      console.error(
        `Error occurred while waking up the server: ${error.message}`,
      );
    }
  });
};
