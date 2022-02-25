const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'rselect',
  description: 'Gets posts from reddit',
  execute(msg, command, udata){
    if(isNaN(command[1])){
      msg.channel.send('Enter a post number :/');
      return;
    }
    if(!udata.hasOwnProperty('subreddit')){
      msg.channel.send('Select a subreddit first. (w! reddit [subreddit])');
      return;
    }
    if(udata.subreddit === undefined)
    {
      msg.channel.send('Select a subreddit first. (w! reddit [subreddit])');
      return;
    }
    if(!udata.subreddit.hasOwnProperty('children'))
    {
      msg.channel.send('Select a subreddit first. (w! reddit [subreddit])');
      return;
    }
    var idx = command[1];
    if(idx < 1 || idx > Math.min(50,udata.subreddit.children.length))
    {
      msg.channel.send(`Post number should be between 1-${Math.min(50,udata.subreddit.children.length)}`)
      return;
    }
    var data = udata.subreddit.children[idx-1].data;
    /*if(data.over_18==true){
      msg.channel.send(">:(");
      return;
    }*/
    var redditEmbed = new Discord.MessageEmbed()
    .setTitle(data.title)
    .setURL('https://www.reddit.com' + data.permalink)
    .setColor('#FFA500')
    .setAuthor('Reddit','https://external-preview.redd.it/QJRqGgkUjhGSdu3vfpckrvg1UKzZOqX2BbglcLhjS70.png?auto=webp&s=c681ae9c9b5021d81b6c4e3a2830f09eff2368b5')
    .setFooter(`🔼 ${data.ups} | 💬 ${data.num_comments} \n by ${data.author}`);
    if(data.selftext == undefined){
      msg.channel.send("broken subreddit lmfao");
      return;
    }

    if(data.selftext.length > 2000)
      data.selftext = data.selftext.substring(0,1990) + '...';
    if(data.selftext !== '')
      redditEmbed.setDescription(data.selftext);
    if(data.is_video === false && (!data.hasOwnProperty('is_gallery') ||data.is_gallery === false) && data.hasOwnProperty('url_overridden_by_dest'))
      redditEmbed.setImage(data.url_overridden_by_dest);
    else if(data.thumbnail !== 'self')
      redditEmbed.setImage(data.thumbnail);
    msg.channel.send(redditEmbed);
  },
};