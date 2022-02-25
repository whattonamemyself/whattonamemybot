const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'guessinggame',
  description: 'guessing game',
  execute(msg, command, udata){
    if(command.length === 1 || isNaN(command[1]))
    {
      udata.guessinggame = Math.ceil(Math.random() * 100);
      udata.guessattempts = 0;
      msg.channel.send(`I have a number from 1 to 100. Guess my number with "w!guess [number]!"`);
    }
    else if(command[1] < 2)
    {
      udata.guessinggame = -1;
      msg.channel.send(`Uh...`);
    }
    else
    {
      udata.guessattempts = 0;
      udata.guessinggame = Math.ceil(Math.random() * command[1]);
      msg.channel.send(`I have a number from 1 to ${command[1]}. Guess my number with "w!guess [number]!"`);
    }
  },
};