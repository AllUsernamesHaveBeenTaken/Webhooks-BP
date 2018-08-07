
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE payloads(
    id SERIAL PRIMARY KEY NOT NULL,
    payload jsonb,
    isDelivered bool,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE users`;
  return knex.raw(dropQuery);
};
