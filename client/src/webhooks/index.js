export const touchAPI = (endpoint, payload) => {
  fetch(endpoint, {
    method: 'POST', 
    body: JSON.stringify(payload),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
};
