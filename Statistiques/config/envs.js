const dotenv = require('dotenv');
const result = dotenv.config({path: 'app/var/.env'});
if (result.error) {
    throw result.error;
}
const { parsed: envs } = result;

const SEND_SMS_PARAMS = {
    originator : process.env.ORIGINATOR,
    template : process.env.TEMPLATE
}


module.exports = envs;
module.exports = SEND_SMS_PARAMS;
