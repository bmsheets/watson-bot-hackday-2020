const { WebClient } = require('@slack/web-api');
const analyze = require('./analyze');

const client = new WebClient(process.env.SLACK_TOKEN);

const handleAppMentionEvent = async (event) => {
  try {
    const history = await client.conversations.history({
      channel: event.channel,
      limit: 2,
    });
    const previousMessage = history.messages[1].text;
    const analysis = await analyze(previousMessage);

    await client.chat.postMessage({
      channel: event.channel,
      text: analysis,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = handleAppMentionEvent;
