const express = require('express');
const bodyParser = require('body-parser');
const handleAppMentionEvent = require('./handler');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/slack/actions', (req, res) => {
  handleAppMentionEvent(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.listen(port, () => console.log(`WatsonBot listening at http://localhost:${port}`));
