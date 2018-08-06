const axios = require('axios');
const CryptoJS = require("crypto-js");

function sendWebhook(endpoint, payload){
  axios.defaults.headers.post.signature = sign(JSON.stringify(payload), 'Secret123');
  return axios.post(endpoint, {...payload})
  .then(function (response) {
    console.log(response.status + response.statusText);
    return response.status;
  })
  .catch(function (error) {
    return error.response.status;
  });
}

function sign(payload, key) {
  return CryptoJS.HmacSHA256(payload, key).toString();
}

module.exports = {
  sendWebhook,
  sign
}