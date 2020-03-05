const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

module.exports.run = async (bot, message,args) => {
  const key = `${message.guild.id}-${message.author.id}`; // Set Key to Author
  bot.disable = new Enmap({name: "disable"}); // Establish Database for Disable option
  bot.disable.ensure(key, {disable: false}); // Ensure default is set to false

  if(!args[0]){return message.channel.send("Please provide an option to Enable.")}

  if(args[0] === "LevelUpPing"){
    if(bot.disable.get(key, "disable") === false){return message.channel.send("Level-Up Ping is already enabled for you.");}
    bot.disable.set(key, false, "disable"); // Set Disable to True
    message.channel.send("Level-Up Ping succesfully **enabled**.");
    return
  }

  else {return message.channel.send("This is not an option.");}
}

module.exports.help = {
    name: "enable",
    aliases: ["enable"],
    usage: "`$enable <option>` - **Enable the selected Option**",
    description: "Current options: `LevelUpPing`",
    accessableBy: "Members"
  }