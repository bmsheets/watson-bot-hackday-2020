const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => res.send(req.body.challenge));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
