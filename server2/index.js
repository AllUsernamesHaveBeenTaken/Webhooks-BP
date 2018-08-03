const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/webhook_endpoint', function (req, res) {
  console.log(req.body)
  res.status(200);
  res.send('Webhook received!');
});

app.listen(process.env.PORT || 8000);