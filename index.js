const Discord = require('discord.js');
const bot = new Discord.Client();
const stock = require('stock-info');

bot.login(process.env.token);

const prefix = '!';

bot.on('ready', () =>{
    console.log('Bot is online!');
    bot.user.setActivity('The Stock Market', {type: "WATCHING"});
});

bot.on('message', async msg => {
    let args = msg.content.substring(prefix.length).split(' ');
    switch (args[0]){
        case 'stock':
            let stockInfos = await stock.getSingleStockInfo(args[1]);
            //console.log(stockInfos);
            stockEmbed = new Discord.MessageEmbed()
            .setTitle('Stock for '+ args[1])
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F9e1f6e2ee20f44aa1f3be4f71e9f3e52b6ae2c7e%2Fc%3D0-110-2121-1303%2Flocal%2F-%2Fmedia%2F2019%2F03%2F14%2FUSATODAY%2Fusatsports%2FMotleyFool-TMOT-620a2c0a-getty-stocks-down.jpg%3Fwidth%3D3200%26height%3D1680%26fit%3Dcrop&f=1&nofb=1')
            .addField('**Name:** ', stockInfos.shortName)
            .addField('**OPEN**', stockInfos.regularMarketOpen,true)
            .addField('**HIGH**', stockInfos.regularMarketDayHigh,true)
            .addField('**LOW**', stockInfos.regularMarketDayLow,true)
            .addField('**VOL**', stockInfos.regularMarketVolume,true)
            .addField('**P/E**', stockInfos.trailingPE,true)
            .addField('**EPS**', stockInfos.epsTrailingTwelveMonths,true)
            .addField('**MKT CAP**', stockInfos.marketCap,true)
            .addField('**52 WK HIGH**', stockInfos.fiftyTwoWeekHigh,true)
            .addField('**52 WK LOW**', stockInfos.fiftyTwoWeekLow,true)
            .addField('**AVG VOL**', stockInfos.averageDailyVolume3Month,true);

            msg.channel.send(stockEmbed);
    }
})