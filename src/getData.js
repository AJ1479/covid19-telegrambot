const miniget = require('miniget');
const Store = require('./models/store.model');

const store = async () => {
    try {
        const [, body] = await miniget.promise('https://api.covid19india.org/data.json');
        const doc = await Store.findOneAndReplace({}, body);
        return doc;
    } catch (err) {
        return err;
    }
};
module.exports = store;
