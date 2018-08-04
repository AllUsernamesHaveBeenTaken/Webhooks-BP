const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const CryptoJS = require("crypto-js");
const app = express();

const User = require('./models/user.js');
const Payload = require('./models/payload.js');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.post('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/signup', User.signup);

app.post('/signin', User.signin);

app.post('/signed_webhook', function (req, res) {
  console.log('/signed_webhook', req.body);
  sendWebhook(req.body.endpoint, req.body.payload);
  return res.send(JSON.stringify(req.body.payload));
});

app.post('/http_auth_webhook', function (req, res) {
  console.log('/http_auth_webhook', req.body);
  if (req.body.user === undefined) {
    return res.status(404)
  }

  User.signinINTERN({body: {...req.body.user}}).then(function(user){
    if (User.authenticate({...user})) {
      Payload.savePayload(req.body);
      sendWebhook(req.body.endpoint, req.body);
      return res.send(JSON.stringify(req.body));
    } else {
      res.status(404)
    }   
  });
});

app.post('/api_retrieval_webhook', function (req, res) {
  console.log('/api_retrieval_webhook', req.body);
  Payload.savePayload(req.body.payload).then(function(payload) {
    sendWebhook(req.body.endpoint, {webhook_id: payload.id});
  });
  return res.send(JSON.stringify(req.body.payload));
});

app.post('/retrieve_payload', function (req, res) {
  console.log('/retrieve_payload', req.body); 
  Payload.findPayload(req.body.webhook_id).then(function(payload) {
    console.log('PAYLOAD', payload.payload)
    sendWebhook(req.body.callback, payload.payload);
  }); 
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