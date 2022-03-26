require('dotenv').config();
module.exports = {
    server: {
        port: process.env.APP_PORT,
        db_url: process.env.DB_URL,
    }
}
