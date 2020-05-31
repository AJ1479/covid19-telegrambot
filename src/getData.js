const miniget = require('miniget');
const Store = require('./models/store.model');

let doc;

const store = async () => {
    try {
        const [, body] = await miniget.promise('https://api.covid19india.org/data.json');
        doc = await Store.findOne();
        if (!doc) {
            const storeObj = new Store({
                data: body,
            });
            await storeObj.save();
            doc = await Store.findOne();
        } else {
            doc.data = body;
        }
        return doc;
    } catch (err) {
        return err;
    }
};
exports.store = store;
