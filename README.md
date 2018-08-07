# Webhooks-BP
This is an app that sends webhooks to a given endpoint for my bachelor's thesis.

This app is build with a React frond-end (/client), an Express server back-end (/server) and a Postgress database.
/server2 is a server that can receive webhooks. 

All relevant data is logged in the console.

## Getting started

1. `git clone https://github.com/AllUsernamesHaveBeenTaken/Webhooks-BP`
1. Open 3 terminals

   Navigate to: 
   
   * /client
   * /server
   * /server2
   
   `npm or yarn install`
   
   There is no install needed for server2
   
1. Create a postgress db named 'webhooks'

1. In /server/db `knex migrate:latest`
   
1. Start servers: `node or nodemon index.js`

1. Start client: `yarn start`

Aaaand you're guud to go.

## Authentication

**You need an account for authenticated calls.**

You can use my predefined credentials after runnen this cURL call:
````
curl "http://localhost:8080/signup" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "username": "seppesnoeck",
    "password": "Azerty123"
  }'
````

## Endpoints

1. For a Signed and HTTP Authentication webhook use: `http://localhost:8000/webhook_endpoint`
1. For an API Retrieval webhook use: `http://localhost:8000/webhook_endpoint_retrieval`
1. To get a server error ent trigger the retry with backoff functionality use: `http://localhost:8000/500`

## Extra info

* The client is running on `PORT:3000`
* The server is running on `PORT:8080`
* server2 is running on `PORT:8000`
