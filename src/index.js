const miniget = require('miniget');
const api = require('./api');
require('./models/db');
const Store = require('./models/store.model');

api.on('message', async (message) => {
    console.log(message);
    const [, body] = await miniget.promise('https://api.covid19india.org/data.json');
    const storeObj = new Store({
        data: body,
    });
    await storeObj.save();
    // setInterval(async () => {
    //     [, body] = await miniget.promise('https://api.covid19india.org/data.json');
    //     storeObj = new Store({
    //         data: body,
    //     });
    //     await storeObj.save();
    // }, 1000 * 60 * 60);
    const doc = await Store.findOne();
    try {
        let i;
        for (i = 0; i < (JSON.parse(doc.data).statewise).length; i += 1) {
            const a = JSON.parse(doc.data).statewise[i].state;
            if (message.text.toLowerCase() === a.toLowerCase()) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: JSON.parse(doc.data).statewise[i].confirmed,
                });
            }
        }
        if (/^hi$/i.test(message.text)) {
            api.sendMessage({
                chat_id: message.chat.id,
                text: 'You are going to die',
            });
        }

        if (message.text === '/start') {
            api.sendMessage({
                chat_id: message.chat.id,
                text:

               `Welcome human
                
This bot will give you the latest statistics of COVID-19 cases in India.
                
Just ask me the count of the confirmed cases by sending me the name of the state or type in 'total' for the total count.

P.S. Don't say hi to me`,
            });
        }
    } catch (err) { console.log(err); }
});
