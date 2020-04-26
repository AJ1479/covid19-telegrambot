// const miniget = require('miniget');
const api = require('./api');
require('./models/db');
// const Store = require('./models/store.model');
const getData = require('./getData');
const strings = require('./strings');

let j = 0;


api.on('message', async (message) => {
    console.log(message);
    const doc = await getData.store();
    const info = (JSON.parse(doc.data)).statewise;
    try {
        if (!message.reply_to_message) {
            if (/^hi$/i.test(message.text)) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.onHi,
                });
            } else if (message.text === strings.askStart) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.onStart,
                });
            } else if (message.text === strings.askAbout) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.onAbout,
                });
            } else if (message.text === strings.askCount) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.onCount(info[0].confirmed, info[0].active, info[0].recovered,
                        info[0].deaths, info[0].lastupdatedtime.slice(0, 16)),
                });
            } else if (message.text === strings.askStatewise) {
                let i;
                for (i = 1; i < (info).length; i += 1) {
                    api.sendMessage({
                        chat_id: message.chat.id,
                        text: strings.onStateName(info[i].state, info[i].confirmed,
                            info[i].active, info[i].recovered,
                            info[i].deaths, info[i].lastupdatedtime.slice(0, 16)),
                    });
                }
            } else if (message.text === strings.askState) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.onState,
                    reply_markup: JSON.stringify({
                        force_reply: true,
                    }),
                });
            } else {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.tryAgainMessage,
                });
            }
        } else
        if (message.reply_to_message.text === strings.onState) {
            let i;
            for (i = 0; i < (info).length; i += 1) {
                const a = info[i].state;
                if (message.text.toLowerCase() === a.toLowerCase()) {
                    j = 1;
                    api.sendMessage({
                        chat_id: message.chat.id,
                        text: strings.onStateName(info[i].state, info[i].confirmed,
                            info[i].active, info[i].recovered,
                            info[i].deaths, info[i].lastupdatedtime.slice(0, 16)),
                    });
                }
            }
            if (j === 0) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    text: strings.tryAgainMessage,
                });
            } else {
                j = 0;
            }
        } else {
            api.sendMessage({
                chat_id: message.chat.id,
                text: strings.tryAgainMessage,
            });
        }
    } catch (err) { console.log(err); }
});
