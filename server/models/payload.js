const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database  = require('knex')(configuration);
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const savePayload = (payload) => {
  return database.raw(
    "INSERT INTO payloads (payload, isDelivered, created_at) VALUES (?, ?, ?) RETURNING id, payload, isDelivered, created_at",
    [payload, false, new Date()]
  )
  .then((data) => data.rows[0])
}

const findPayload = (id) => {
  return database.raw("SELECT * FROM payloads WHERE id = ?", [id])
    .then((data) => data.rows[0])
}

const isDelivered = (id) => {
  return database.raw("UPDATE payloads SET isDelivered = ? WHERE id = ?", [true, id])
    .then((data) => data.rows[0])
}

module.exports = {
  savePayload,
  findPayload,
  isDelivered
}