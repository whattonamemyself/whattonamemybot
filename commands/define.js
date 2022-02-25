const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'define',
  description: 'browses google dictionary',
  execute(msg, command, udata){
    if(command.length === 1 || command[1] === '1')
    {
      msg.channel.send('Please enter a word to be defined');
      return;
    }
    (async () => {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${command[1]}`)
      .then(
        async function (data)
        {
          return await data.json();
        }
      )
      .then(
        function(json)
        {
          if(json.hasOwnProperty('title') && json.title === 'No Definitions Found')
          {
            msg.channel.send('Please enter a real word');
            return null;
          }
          return json[0];
        }
      )
      .then(
        async function(data)
        {
          if(data === undefined)
          {
            msg.channel.send('There was an error in getting the word :/');
            return;
          }
          if(data === null) return;
          var dictembed = new Discord.MessageEmbed()
          .setTitle('📘 ' + command[1])
          .setColor('#0099ff')
          .setURL('https://google.com/search?q=define%20' + command[1]);
          if(data.phonetics.length > 0)
            dictembed.setDescription(data.phonetics[0].text)
          for(let x of data.meanings){
            var temp = '>>> ';
            var count = 1;
            for(let i of x.definitions){
              var temp2 = temp;
              temp = temp + `**${count}. ${i.definition}**\n`;
              if(i.hasOwnProperty('example'))
                temp = temp + `ㅤ*"${i.example}"* \n`;
              temp = temp + '\n';
              count++;
              if(temp.length > 1000)
              {
                temp = temp2;
                break;
              }
            }
            dictembed.addFields({name:x.partOfSpeech, value:temp, inline:false});
          }
          msg.channel.send(dictembed);
        }
      );
    })();
  },
};