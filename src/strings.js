
module.exports = {
    onHi: 'You are going to die',
    onStart: `Welcome human.
               
    Just ask me the count of the cases by sending me  
    /count - For the total count 
    /state (followed by state name) - For the statewise count
    /about - For info about the bot
    P.S. Don't say hi to me`,
    onCount(conf, act, rec, deaths, update) {
        return `
         Confirmed: ${conf}
Active: ${act}
Recovered: ${rec}
Deaths: ${deaths}
Last Updated on: ${update}`;
    },
    onStateName(state, conf, act, rec, deaths, update) {
        return `
In ${state},
Confirmed cases: ${conf}
Active cases: ${act}
Recovered cases: ${rec}
Deaths: ${deaths}
Last Updated on: ${update}`;
    },
    onState: 'Enter state:',
    tryAgainMessage: 'Try again',
    onAbout: 'This bot will give you the latest stats of the COVID-19 cases in India',
    askStart: '/start',
    askAbout: '/about',
    askCount: '/count',
    askStatewise: '/statewise',
    askState: '/state',

};
