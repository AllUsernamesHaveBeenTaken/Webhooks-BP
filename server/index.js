const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const User = require('./models/user.js');
const Payload = require('./models/payload.js');
const { retryWithBackoff } = require('./retryWithBackoff.js');
const { sendWebhook, sign } = require('./webhooks.js');

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
  Payload.savePayload(req.body.payload).then(function(payload) {
    retryWithBackoff(sendWebhook, req.body.endpoint, req.body.payload, req.body.secret, 10, 100, function(result) {
      console.log(result);
      if (result == 200) {
        Payload.isDelivered(payload.id);
      }
    });
  });
  
  return res.send(JSON.stringify(req.body.payload));
});

app.post('/http_auth_webhook', function (req, res) {
  console.log('/http_auth_webhook', req.body);
  if (req.body.user === undefined) {
    return res.status(401)
  }

  User.signinINTERN({body: {...req.body.user}}).then(function(user){
    if (User.authenticate({...user})) {
      Payload.savePayload(req.body.payload).then(function(payload) {
        retryWithBackoff(sendWebhook, req.body.endpoint, req.body.payload, req.body.secret, 10, 100, function(result) {
          console.log(result);
          if (result == 200) {
            Payload.isDelivered(payload.id);
          }
        });
      });
      return res.send(JSON.stringify(req.body));
    } else {
      res.status(404)
    }   
  });
});

app.post('/api_retrieval_webhook', function (req, res) {
  console.log('/api_retrieval_webhook', req.body);
  Payload.savePayload(req.body.payload).then(function(payload) {
    retryWithBackoff(sendWebhook, req.body.endpoint, {webhook_id: payload.id}, req.body.secret, 10, 100, function(result) {
        console.log(result);
      });
  });
  return res.send(JSON.stringify(req.body.payload));
});

app.post('/retrieve_payload', function (req, res) {
  console.log('/retrieve_payload', req.body); 
  Payload.findPayload(req.body.webhook_id).then(function(payload) {
    console.log('PAYLOAD', payload.payload)
    retryWithBackoff(sendWebhook, req.body.callback, payload.payload, req.body.secret, 10, 100, function(result) {
        console.log(result);
        if (result == 200) {
          Payload.isDelivered(payload.id);
        }
      });
  }); 
  return res.send(JSON.stringify(req.body));
});

app.listen(process.env.PORT || 8080);