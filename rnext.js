const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'reddit',
  description: 'Gets stuff from reddit',
  execute(msg, command, udata){
    if (command.length == 1)
    {
      msg.channel.send('Give me a subreddit :/')
      return;
    }
    var link = `https://www.reddit.com/r/${command[1]}/`;
    var temp = '';
    if(command.length >= 3 && isNaN(command[2]))
      temp = command[2];
    link = link + temp + '.json?t=all&limit=50';
    temp = temp + ' ';
    var start = 0;
    if(!isNaN(command[command.length-1]))
      start = (command[command.length-1]-1)*5;
    (async () => {
      if(!udata.hasOwnProperty('subLink') || udata.subLink != link)
      {
        udata.subreddit = await fetch(link)
        .then(function(res) {
          return res.json();
        })
        .then(function(res) {
          if (res.hasOwnProperty('message'))
            return null;
          else
            return res.data;
        })
        .then(function(data) {
          if (data === null || data.children.length === 0)
          {
            if(command.length >= 3 && isNaN(command[2]))
            {
              if(command[2] != 'hot' && command[2] != 'new' && command[2] != 'top')
                msg.channel.send('Second argument should be "hot", "new", or "top"');
            }
            else
              msg.channel.send('Bruh enter an existing subreddit');
          }
          else {
            return data;
          }
        });
        console.log(udata.subreddit);
        udata.subLink = link;
      }
      if(udata.subreddit === null) return;
      var data = udata.subreddit;
      var redditEmbed = new Discord.MessageEmbed();
      var numpages = Math.ceil(data.children.length/5);
      if(start/5+1 > numpages)
        msg.channel.send(`Please pick a valid page (1-${numpages})`);
      else{
        redditEmbed.setColor('#FFA500')
        .setAuthor('Reddit','https://external-preview.redd.it/QJRqGgkUjhGSdu3vfpckrvg1UKzZOqX2BbglcLhjS70.png?auto=webp&s=c681ae9c9b5021d81b6c4e3a2830f09eff2368b5')
        .setTitle('r/' + command[1])
        .setURL(`https://www.reddit.com/r/${command[1]}`)
        .setFooter(`Type "w!rselect [post number] to select a post.\nType "w!rnext" to go to next page, or type "w!reddit ${command[1]} ${temp}[page]" to select a page.\nPage ${start/5+1}/${numpages} - r/${command[1]}`)
        for (var i = start; i < Math.min(start + 5,data.children.length); i++)
        {
          if(data.children[i].data.title.length > 75)
            data.children[i].data.title = data.children[i].data.title.substring(0,72) + '...';
          redditEmbed.addFields({ name: (i+1) + '. ' +    data.children[i].data.title, value: `by ${data.children[i].data.author} - :arrow_up: ${data.children[i].data.ups} | 💬 ${data.children[i].data.num_comments}` });
        }
        msg.channel.send(redditEmbed);
      }
    })();
  },
};