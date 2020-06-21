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