const Discord = require("discord.js");
const Enmap = require("enmap");
let ft = require('../index.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]); //|| message.guild.members.get(args[0]); // Specify the Member
        let reason = args.slice(1).join(" ");

        if (member === message.author) {return message.channel.send(ft.gaiaEmbed(`You cannot ban yourself.`, "#64c166"));}
        if (!reason) {return message.channel.send(ft.gaiaEmbed(`Please provide a reason.`, "#64c166"));}

        await message.guild.ban(member);
        return
}

module.exports.help = {
    name: "ban",
    aliases: ["ban"],
    usage: "`$ban <mention | id> <reason>`",
    description: "Permanently ban a User.",
    accessableBy: "Members"
}