# Webhooks-BP
This is an app that sends webhooks to a given endpoint for my bachelor's thesis.

This app is build with a React frond-end (/client), an Express server back-end (/server) and a Postgress database.
/server2 is a server that can receive webhooks. 

All relevant data is logged in the console.

## Getting started

1. npm install
1. create a postgress db named 'webhooks'
1. /server/db knex migrate:latest
1. node or nodemon index.js to boot the servers
1. yarn start to boot the client

Aaaand you're guud to go.
