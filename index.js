const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// start bot
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
var data = JSON.parse(fs.readFileSync('userdata.txt'));

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);    
  client.user.setActivity('w!help');
});

client.on('message', msg => {
  msg.content = msg.content.split('\n')[0];
  if(msg.content === 'w! save' && msg.author.id === '500494514159484948')
  {
    var temp = data;
    for(var user in data)
      delete data[user]['subreddit'];
    for(var user in data)
      delete data[user]['yt'];
    fs.writeFileSync('userdata.txt', JSON.stringify(data));
    console.log('data saved');
    return;
  }
  if (!msg.content.startsWith('w!')) return;
  if(!data.hasOwnProperty(msg.author.id))
  {
    data[msg.author.id] = new Object();
    data[msg.author.id].money = 100;
    data[msg.author.id].inv = {};
    data[msg.author.id].buildings = {};
    data[msg.author.id].people = {};
  }
  const command = msg.content.slice(2).trim().split(' ');
  var foundcommand = false;
  for(let [key, value] of client.commands)
  {
    if(command[0] === key)
    {
      foundcommand = true;
      value.execute(msg, command, data[msg.author.id]);
    }
    if(foundcommand) break;
  }
  if(!foundcommand)
    msg.channel.send(`Bruh, "${msg.content}" isn't a command you idiot`);
});

client.login(process.env.TOKEN);

