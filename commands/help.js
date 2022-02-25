const Discord = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Provides help',
  execute(msg, command, udata){
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    .addFields(
      { name: ':earth_americas: Websites', value: 'w!help websites', inline: true },
      { name: ':smile: Fun', value: 'w!help fun', inline: true }
    )
    
    const webHelpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    .addFields(
      {name: ':book: Wikipedia', value: 'w! wiki [query]', inline:false},
      {name: ':blue_book: Dicationary', value: 'w! define [query]', inline:false},
      {name: ':arrow_forward: Youtube', value: 'w!yt [search],\n w!yselect [video number]'},
      { name: ':large_orange_diamond: Reddit', value: 'w!reddit [subreddit], \n w!reddit [subreddit][page], \n w!reddit [subreddit][new/top], \n w!reddit [subreddit][new/top][page], \n w!rselect [post number],\n w!rnext', inline: false }
    );
    
    const funHelpEmbed = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setTitle('Help')
    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    .addFields(
      {name: ':smile: Fun', value: 'w!roll \nw!roll [number of die] \n w!guessinggame\n w!guessinggame [max number]\n w!guess [number]\nw!randomstring\nw!randomstring [number of strings]', inline:false},
    )

    if (command.length == 1)
      msg.channel.send(helpEmbed);
    else if (command[1] == 'websites')
      msg.channel.send(webHelpEmbed);
    else if (command[1] == 'fun')
      msg.channel.send(funHelpEmbed);
    else
      msg.channel.send(helpEmbed);
    return udata;
  },
};