const Discord = require("discord.js");
const Enmap = require("enmap");
let ft = require('../index.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {
    if(message.member.roles.find(r => r.name === "Gaia Permissions")){
        let channel = bot.channels.get("667065109050425354");
        let moderator = message.author.username;
        try {
            var member = message.mentions.members.first() || message.guild.members.get(args[0]);
            var muteRole = message.guild.roles.find(role => role.name === "muted");

        if (!member.roles.has(muteRole.id)) return message.channel.send(ft.gaiaEmbed(`**${member.user.username}** is not muted!`, "#64c166"));
        } catch(err) {
            return message.channel.send(ft.gaiaEmbed(`User couldn't be found!`, "#64c166"));
        }
        
        await member.removeRole(muteRole);
        
        message.channel.send(ft.gaiaEmbed(`**${member.user.username}** succesfully unmuted!`, "#64c166"));

        let embed = new Discord.RichEmbed()
              .setAuthor(`Gaia`, bot.user.displayAvatarURL)
              .setColor("#6dd662")
              .setDescription("**Unmuted**")
              .addField("Name", member.user.username, true)
              .addField("Moderator", moderator, true)
              .addField("Reason", "Manual Unmute")
              .setFooter(`ID: ${member.user.id}`)
              .setTimestamp();

        channel.send(embed);

        delete bot.muted[member.user.id];
        fs.writeFile('./muted.json', JSON.stringify(bot.muted), err => {
            if(err) throw err;
        });
        return

    } else {return message.channel.send(ft.gaiaEmbed("You do not have the required permissions to perform this command.", "#7289da"))}

}

module.exports.help = {
    name: "unmute",
    aliases: ["um"],
    usage: "`$unmute <id | mention>`",
    description: "Unmute a User",
    accessableBy: "Moderators"
}