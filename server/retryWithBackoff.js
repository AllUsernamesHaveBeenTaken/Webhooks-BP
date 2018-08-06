async function retryWithBackoff(toTry, endpoint, payload, max, delay, callback) {
  console.log('max',max,'next delay',delay);
  var result = await toTry(endpoint, payload);
  console.log('result', result);
  if (result < 500 || result >= 600) {
      callback(result);
  } else {
      if (max > 0) {
          setTimeout(function() {
              retryWithBackoff(toTry, endpoint, payload, --max, delay * 2, callback);
          }, delay);

      } else {
           console.log('we give up');   
      }
  }
}

module.exports = {
  retryWithBackoff
}