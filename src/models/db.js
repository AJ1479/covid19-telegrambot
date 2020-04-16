const mongoose = require('mongoose');
const miniget = require('miniget');
const Store = require('./store.model');

mongoose.connect(process.env.MONGO_URL, async (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log('Mongo Connection Success');
        const [, body] = await miniget.promise('https://api.covid19india.org/data.json');
        const storeObj = new Store({
            data: body,
        });
        await storeObj.save();
    }
});
