const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'yselect',
  description: 'youtube select',
  execute(msg, command, udata){
    if(command.length === 0 || isNaN(command[1]))
    {
      msg.channel.send('Enter a number');
      return;
    }
    if(command[1] < 1 || command[1] > 5)
    {
      msg.channel.send(`Number should be between 1 and ${Math.min(5,udata.yt.length)}`);
      return;
    }
    if(!udata.hasOwnProperty('yt'))
    {
      msg.channel.send('Search for something first (w! yt [query])');
      return;
    }
    msg.channel.send(udata.yt[command[1]-1].url);
  },
};