const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'ping',
  description: 'pong',
  execute(msg, command, udata){
    msg.channel.send('Pong!');
  },
};