/* eslint-disable no-console */

const { createEventAdapter } = require('@slack/events-api');
const handleAppMentionEvent = require('./handler');

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;

slackEvents.on('app_mention', (event) => {
  console.log(`Received an app mention event: user ${event.user} in channel ${event.channel}`);
  handleAppMentionEvent(event);
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on port ${server.address().port}`);
})();
