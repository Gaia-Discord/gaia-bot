const Discord = require("discord.js");
const Enmap = require("enmap");
let ft = require('../index.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {
    if(message.member.roles.find(r => r.name === "Gaia Permissions")){
        let member = args[0]; //|| message.guild.members.get(args[0]); // Specify the Member

        message.guild.fetchBans()
        .then(bans => {
            if (bans.some(u => member.includes(u.username))){
                let user = bans.find(user => user.username === member)
                
                let embed = new Discord.RichEmbed()
                    .setAuthor(`Gaia`, bot.user.displayAvatarURL)
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setColor("#6dd662")
                    .setDescription("**Unbanned**")
                    .addField("Name", user.username)
                    .addField("Moderator", message.author.username)
                    .setFooter(`ID: ${user.id}`)
                    .setTimestamp();

                bot.channels.get("667065109050425354").send(embed);
                message.guild.unban(user.id);
                return
            }
            else if(bans.some(u => member.includes(u.id))){
                let user = bans.find(user => user.id === member)
                
                let embed = new Discord.RichEmbed()
                    .setAuthor(`Gaia`, bot.user.displayAvatarURL)
                    .setThumbnail(bot.user.displayAvatarURL)
                    .setColor("#6dd662")
                    .setDescription("**Unbanned**")
                    .addField("Name", user.username)
                    .addField("Moderator", message.author.username)
                    .setFooter(`ID: ${user.id}`)
                    .setTimestamp();

                bot.channels.get("667065109050425354").send(embed);

                message.guild.unban(member);
            }
            else {
                return message.channel.send(ft.gaiaEmbed(`This user is not banned!`, "#64c166"));
            }
        });
    } else {return message.channel.send(ft.gaiaEmbed("You do not have the required permissions to perform this command.", "#7289da"))}
}

module.exports.help = {
    name: "unban",
    aliases: ["unban"],
    usage: "`$unban <mention | id> <reason>`",
    description: "Unban a User.",
    accessableBy: "Moderators"
}