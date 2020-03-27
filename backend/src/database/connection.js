const knex = require('knex');
const configKnex = require('../../knexfile')
const config = process.env.NODE_ENV === 'test' ? configKnex.test : configKnex.development;

const connection = knex(config);

module.exports = connection;