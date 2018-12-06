
exports.up = function(knex, Promise) {
    return knex.raw(`
    CREATE TABLE users
    (
        id SERIAL PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );
    `);
};

exports.down = function(knex, Promise) {
  
};
