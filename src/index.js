// const miniget = require('miniget');
const api = require('./api');
require('./models/db');
// const Store = require('./models/store.model');
const getData = require('./getData');

let j = 0;


api.on('message', async (message) => {
    console.log(message);
    const doc = await getData.store();
    const info = JSON.parse(doc.data).statewise;
    try {
        if (j === 0) {
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

               `Welcome human.
               
Just ask me the count of the confirmed cases by sending me 
/count - For the total count 
/state (followed by state name) - For the statewise count

P.S. Don't say hi to me`,
                });
            }
            if (message.text === '/count') {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: info[0].confirmed,
                });
            }
            if (message.text === '/state') {
                j = 1;
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: 'Enter state',
                });
            }
        } else {
            j = 0;
            let i;
            for (i = 0; i < (info).length; i += 1) {
                const a = info[i].state;
                if (message.text.toLowerCase() === a.toLowerCase()) {
                    api.sendMessage({
                        chat_id: message.chat.id,
                        text: info[i].confirmed,
                    });
                }
            }
        }
    } catch (err) { console.log(err); }
});
