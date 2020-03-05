const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

let ft = require('../index.js');

module.exports.run = async (bot, message,args) => {
  const key = `${message.guild.id}-${message.author.id}`; // Set Key to Author
  bot.disable = new Enmap({name: "disable"}); // Establish Database for Disable option
  bot.disable.ensure(key, {disable: false}); // Ensure default is set to false

  if(!args[0]){return message.channel.send(ft.gaiaEmbed("Please provide an option to disable.", "#64c166"))}

  if(args[0] === "LevelUpPing"){
    if(bot.disable.get(key, "disable") === true){return message.channel.send("Level-Up Ping is already disabled for you.");}
    bot.disable.set(key, true, "disable"); // Set Disable to True
    message.channel.send("Level-Up Ping succesfully **disabled**.");
    return
  }
  else {return message.channel.send("This is not an option.");}
}

module.exports.help = {
    name: "disable",
    aliases: ["d"],
    usage: "`$disable <option>` - **Disable the selected Option**",
    description: "Current options: `LevelUpPing`",
    accessableBy: "Members"
  }