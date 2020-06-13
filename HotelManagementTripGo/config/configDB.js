const dotenv = require('dotenv');
dotenv.config({path: 'app/var/.env'});

const env = process.env.NODE_ENV; // 'dev' or 'test' or 'prod'

const dev = {
    db: {
        host: process.env.DEV_DB_HOST,
        port: parseInt(process.env.DEV_DB_PORT),
        name: process.env.DEV_DB_NAME
    },
    authAPI: process.env.DEV_AUTH_API_URL,
    MESSAGEBIRD_API_KEY: process.env.TEST_MESSAGEBIRD_API_KEY
};

const test = {
    db: {
        host: process.env.TEST_DB_HOST,
        port: parseInt(process.env.TEST_DB_PORT),
        name: process.env.TEST_DB_NAME
    },
    authAPI: process.env.PROD_AUTH_API_URL,
    MESSAGEBIRD_API_KEY: process.env.TEST_MESSAGEBIRD_API_KEY
};

const prod = {
    db: {
            host: process.env.PROD_DB_HOST,
            port: parseInt(process.env.PROD_DB_PORT),
            name: process.env.PROD_DB_NAME
    },
    authAPI: process.env.PROD_AUTH_API_URL,
    MESSAGEBIRD_API_KEY: process.env.PROD_MESSAGEBIRD_API_KEY
}
const config = {
    dev,
    test,
    prod
};

module.exports = config[env];
