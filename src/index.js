const miniget = require('miniget');
const cheerio = require('cheerio');
const api = require('./api');

api.on('message', async (message) => {
    console.log(message);
    try {
        if (message.text === 'hi') {
            api.sendMessage({
                chat_id: message.chat.id,
                text: 'You are going to die',
            });
            const [, body] = await miniget.promise('https://www.covid19india.org/');
            const $ = cheerio.load(body);
            const hello = $('.level-item is-cherry fadeInUp');
            console.log(hello.html());
        }
    } catch (err) { console.log(err); }
});
