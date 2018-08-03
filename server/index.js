const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const CryptoJS = require("crypto-js");
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.post('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/signed_webhook', function (req, res) {
  console.log('/signed_webhook', req.body);
  sendWebhook(req.body.endpoint, req.body);
  return res.send(JSON.stringify(req.body));
});

app.post('/http_auth_webhook', function (req, res) {
  console.log('/http_auth_webhook', req.body);
  sendWebhook(req.body.endpoint, req.body);
  return res.send(JSON.stringify(req.body));
});

app.post('/api_retrieval_webhook', function (req, res) {
  console.log('/api_retrieval_webhook', req.body);
  sendWebhook(req.body.endpoint, req.body);
  return res.send(JSON.stringify(req.body));
});

app.listen(process.env.PORT || 8080);

function sendWebhook(endpoint, payload){
  axios.defaults.headers.post.signature = sign(JSON.stringify(payload), 'Secret123');
  axios.post(endpoint, {...payload})
  .then(function (response) {
    console.log(response.status + response.statusText);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function sign(payload, key) {
  return CryptoJS.HmacSHA256(payload, key).toString();
}