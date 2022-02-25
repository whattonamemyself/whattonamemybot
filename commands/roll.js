const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'roll',
  description: 'rolls die',
  execute(msg, command, udata){
    if(command.length == 1 || isNaN(command[1]))
    {
      msg.channel.send(`You rolled a ${Math.ceil(Math.random() * 6)}`)
    }
    else if(command[1] < 1 || command[1] > 100)
    {
      msg.channel.send('Choose a number from 1-100');
    }
    else
    {
      var number = Math.ceil(Math.random()*6);
      var total = number;
      var temp = `You rolled a ${number}`;
      for(var i = 0; i < command[1]-1; i++)
      {
        number = Math.ceil(Math.random()*6);
        temp = temp + `,` + number;
        total = total + number
      }
      temp = temp + `\n Total: ${total}, Average :${total / command[1]}`;
      msg.channel.send(temp);
    }
  },
};