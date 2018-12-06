// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host: 'postgres',
            database: 'hamster_db',
            user: 'hamster_user',
            password: 'hamster_pass'
        }
    },

    local: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            database: 'hamster_db',
            user: 'hamster_user',
            password: 'hamster_pass'
        }
    }

};
