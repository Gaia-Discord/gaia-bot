const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

module.exports.run = async (bot, message,args) => {
    if(message.member.roles.find(r => r.name === "Gaia Permissions")){
        if(!args[0]){return message.channel.send("Please set an amount of messages to Purge: `$purge 10`")}
        let amount = args[0];
        try{
            message.channel.bulkDelete(amount);
            message.channel.send(`Succesfully purged ${amount} message(s)!`)
            return
        } catch(err) {
            message.channel.send("Please provide a number to purge.");
            return
        }
    } else {return message.channel.send("You do not have the required permissions to perform this command.")}
}

module.exports.help = {
    name: "purge",
    aliases: ["pg"],
    usage: "`$purge <amount>`",
    description: "Purge the set amount of messages.",
    accessableBy: "Moderators"
  }