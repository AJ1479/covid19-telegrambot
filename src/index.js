const api = require('./api');

api.on('message', async (message) => {
    console.log(message);
    try {
        if (message.text === 'hi') {
            api.sendMessage({
                chat_id: message.chat.id,
                text: 'You are going to die',
            });
        }
    } catch (err) { console.log(err); }
});
