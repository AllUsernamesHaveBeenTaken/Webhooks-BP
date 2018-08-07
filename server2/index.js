const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/webhook_endpoint_retrieval', function (req, res) {
  console.log('-----------------------')  
  console.log(req.body)
  axios.post('http://localhost:8080/retrieve_payload', {callback: 'http://localhost:8000/webhook_endpoint', ...req.body})
  .then(function (response) {
    console.log(response.status + response.statusText);
  })
  .catch(function (error) {
    console.log(error);
  });
  res.status(200);
  res.send('Webhook received!');
});

app.post('/webhook_endpoint', function (req, res) {
  console.log('-----------------------')
  console.log(req.body)
  console.log('signature:', req.headers.signature)
  res.status(200);
  res.send('Webhook received!');
});

app.post('/500', function (req, res) {
  console.log('/500');
  res.status(500)
  res.send('Server faulty!')
});

app.listen(process.env.PORT || 8000);