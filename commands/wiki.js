const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'wiki',
  description: 'gets stuff from wikipedia',
  execute(msg, command, udata){
    if(command.length === 1)
    {
      msg.channel.send('Enter something to search.');
      return;
    }
    var search = '';
    for(var i = 1; i < command.length; i++)
      search = search + command[i] + ' ';
    search = search.substring(0,search.length - 1);
    (async () => {
      fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=&titles=${search}`)
      .then(
        async function(data){
          data = await data.json();
          data = await data.query.pages;
          for(i in data){
            data = await(data[i]);
            break;
          }
          return data;
        }
      )
      .then(
        async function(obj){
          if(obj.hasOwnProperty('missing') || obj.extract == ''){
            msg.channel.send(`Wikipedia does not have an article named "${search}"`);
            return;
          }
          var wikiEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(obj.title)
          .setURL(`https://wikipedia.org/wiki/${obj.title.split(' ').join('%20')}`);
          var temp = await obj.extract;
          if(temp.length > 1000)
            temp = temp.substring(0,997) + '...';
          wikiEmbed.setDescription(temp);
          msg.channel.send(wikiEmbed);
        }
      )
    })();
  },
};