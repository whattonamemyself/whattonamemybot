const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'guess',
  description: 'guess for guessing game',
  execute(msg, command, udata){
    if(!udata.hasOwnProperty('guessinggame') || udata.guessinggame == -1)
    {
      msg.channel.send('Start a game first with "w!guessinggame"');
      return;
    }
    if(command.length === 1 || isNaN(command[1]))
    {
      msg.channel.send('You have to guess a number smh');
      return;
    }
    if(udata.guessinggame == command[1])
    {
      msg.channel.send(`You got the number in ${udata.guessattempts + 1} attempts!`);
      udata.guessinggame = -1;
    }
    else if(parseInt(command[1]) < udata.guessinggame)
    {
      udata.guessattempts = udata.guessattempts + 1;
      msg.channel.send('Higher');
    }
    else
    {
      udata.guessattempts = udata.guessattempts + 1;
      msg.channel.send('Lower');
    }
  },
};