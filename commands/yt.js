const Discord = require('discord.js');
const fetch = require('node-fetch');
const yts = require('yt-search');
module.exports = {
  name: 'yt',
  description: 'youtube',
  execute(msg, command, udata){
    if(command.length == 1)
    {
      msg.channel.send('Enter something to search for :/');
      return;
    }
    var search = '';
    for(var i = 1; i < command.length; i++)
      search = search + command[i] + ' ';
    search = search.substring(0,search.length - 1);
    (async () => {
      udata.youtube = await yts(search)
      .then(function(res){
        return res.videos;
      })
      .then(function(res){
        udata.yt = res;
        var ytembed = new Discord.MessageEmbed()
        .setColor('FF0000')
        .setAuthor('Youtube','https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
        ytembed.setTitle('🔍 ' + search);
        search = search.split(' ').join('%20');
        ytembed.setURL('https://youtube.com/search?q='+search);
        for(var x = 0; x < Math.min(5,res.length); x++)
        {
          var i = res[x];
          i.description = i.description.split('\n').join(' ');
          if(i.description.length > 100)  i.description = i.description.substring(0,97) + '...';
          if(i.title.length > 65) i.title = i.title.substring(0,62) + '...';
          ytembed.addFields({name:`${x+1}. ${i.title}`, value:`${i.views} views [${i.author.name}](${i.author.url})`});
        }
        msg.channel.send(ytembed);
      });
    })();
  },
};