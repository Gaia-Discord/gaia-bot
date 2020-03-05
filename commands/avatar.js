const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports.run = async (bot, message,args) => {
    if(!args[0]){return message.channel.send("Please mention a user who's avatar you want to display.")} else{

    const member = message.mentions.members.first();
    const attachment = member.user.displayAvatarURL;
    const attachment2 = attachment.replace('?size=2048','');

    const attachments = new Discord.Attachment(attachment2);

	message.channel.send(`${message.mentions.members.first()}'s **Profile Picture:**`, attachments);

}}

module.exports.help = {
    name: "avatar",
    aliases: ["a"],
    usage: "`$avatar <mention>`",
    description: "Display a users profile picture.",
    accessableBy: "Members"
  }