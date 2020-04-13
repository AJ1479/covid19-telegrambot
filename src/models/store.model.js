const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    data: {
        type: String,
    },
});

module.exports = mongoose.model('Store', storeSchema);
