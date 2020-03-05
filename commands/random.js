const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

let ft = require('../index.js');

module.exports.run = async (bot, message, args, gaiaEmbed) => {
  const avatar = "https://i.imgur.com/1OUJrDi.png";
  if(message.member.roles.find(r => r.name === "Gaia Permissions")){
    if(!args[0]){
      message.channel.send(ft.gaiaEmbed("Use `$random <input1 input2 ...>` to get a Randomly Picked result.", "#64c166"));
      return
      
    } else {
      var array = args;
      var randomizedAnswer = array[Math.floor(Math.random() * array.length)];

      let embed = new Discord.RichEmbed()
                  .setAuthor(`Gaia`, avatar)
                  .setThumbnail(avatar)
                  .setColor("#64c166")
                  .addField("Result", `${randomizedAnswer}`)
                  .setDescription("Use $random <input1 input2 ...> to get a Randomly Picked result")
      
              message.channel.send(embed);
              return
    }
  }else {return message.channel.send(ft.gaiaEmbed("You do not have the required permissions to perform this command.", "#7289da"))}
}

module.exports.help = {
    name: "random",
    aliases: ["random"],
    usage: "`$raffle <user1, user2, ...>`",
    description: "Randomly select a User from the given list.",
    accessableBy: "Moderators"
  }