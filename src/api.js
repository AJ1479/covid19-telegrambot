const API = require('telegram-bot-api');
require('dotenv').config();

const { API_KEY } = process.env;

const api = new API({
    token: API_KEY,
    updates: {
        enabled: true,
    },
});

module.exports = api;
