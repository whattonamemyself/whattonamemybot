const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'rnext',
  description: 'Gets stuff from reddit',
  execute(msg, command, udata){
      if(!udata.hasOwnProperty('subreddit')) {
        msg.channel.send('Select a subreddit first. (w! reddit [subreddit])');
        return;
      }
      if(udata.subreddit === undefined) {
        msg.channel.send('Select a subreddit first. (w! reddit [subreddit])');
        return;
      }
      if(udata.subreddit === null) {
        msg.channel.send('Select a subreddit first. (w! reddit [subreddit])');
        return;
      }
      var data = udata.subreddit;
      var redditEmbed = new Discord.MessageEmbed();
      var numpages = Math.ceil(Math.min(50,data.children.length)/5);
      udata.redditPage ++; 
      if(udata.redditPage > numpages) udata.redditPage = 1;
      redditEmbed.setColor('#FFA500')
      .setAuthor('Reddit','https://external-preview.redd.it/QJRqGgkUjhGSdu3vfpckrvg1UKzZOqX2BbglcLhjS70.png?auto=webp&s=c681ae9c9b5021d81b6c4e3a2830f09eff2368b5')
      .setTitle('r/' + udata.subredditName)
      .setURL(`https://www.reddit.com/r/${udata.subredditName}`)
      .setFooter(`Type "w!rselect [post number] to select a post.\nType "w!rnext" to go to next page, or type "w!reddit ${udata.subredditName} ${udata.reddittemp}[page]" to select a page.\nPage ${udata.redditPage}/${numpages} - r/${udata.subredditName}`)
      for (var i = (udata.redditPage - 1)*5; i < Math.min((udata.redditPage - 1)*5 + 5,Math.min(50,data.children.length)); i++)
      {
        /*if(data.children[i].data.over_18 === true)
        {
          redditEmbed.addFields({ name: (i+1) + '. [censored (nsfw)]', value: `by ${data.children[i].data.author} - :arrow_up: ${data.children[i].data.ups} | 💬 ${data.children[i].data.num_comments}`});
          continue;
        }*/
        if(data.children[i].data.title.length > 75)
          data.children[i].data.title = data.children[i].data.title.substring(0,72) + '...';
        redditEmbed.addFields({ name: (i+1) + '. ' +    data.children[i].data.title, value: `by ${data.children[i].data.author} - :arrow_up: ${data.children[i].data.ups} | 💬 ${data.children[i].data.num_comments}` });
      }
      msg.channel.send(redditEmbed);
  },
};