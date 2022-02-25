const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'randomstring',
  description: 'generates random strings',
  execute(msg, command, udata){
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    if(command.length == 1 || isNaN(command[1]))
    {
      var temp = '';
      for(var i = 0; i < 5 + Math.ceil(Math.random() * 10); i++)
        temp = temp + chars[Math.ceil(Math.random() * 26) - 1];
      msg.channel.send(temp);
    }
    else if(command[1] < 1 || command[1] > 100)
    {
      msg.channel.send('Choose a number from 1-100');
    }
    else
    {
      var temp = '';
        for(var i = 0; i < 5 + Math.ceil(Math.random() * 10); i++)
          temp = temp + chars[Math.ceil(Math.random() * 10) - 1];
      for(var x = 1; x < command[1]; x++)
      {
        temp = temp + ', ';
        for(var i = 0; i < 5 + Math.ceil(Math.random() * 10); i++)
          temp = temp + chars[Math.ceil(Math.random() * 26) - 1];
      }
      msg.channel.send(temp);
    }
  },
};