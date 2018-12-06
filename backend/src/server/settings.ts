require('dotenv').config();

const port = process.env.PORT || 8000;

const SETTINGS = {
    https: typeof process.env.HTTPS !== 'undefined' && process.env.HTTPS === 'true',
    port,
    secret: process.env.SECRET || 'kYsKYYeMfg5xMmGT',
    postgresConnectionString: process.env.POSTGRES_CON || ''
};

export default SETTINGS;
