const {Client: PgClient} = require("pg");

const pgClient = new PgClient({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
});

pgClient.connect(undefined).then(r => console.log('Connected to database')).catch(e => console.log(e));

module.exports = {
    pgClient,
};