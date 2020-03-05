const Discord = require("discord.js");
const Enmap = require("enmap");
let ft = require('../index.js');
const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {
    if(message.member.roles.find(r => r.name === "Gaia Permissions")){
        if(!args[0]){return message.channel.send(ft.gaiaEmbed("You haven't specified any arguments.\nUse `$mh mute` to get more information on how to use the command.","#64c166"))}
        if(!args[1]){return message.channel.send(ft.gaiaEmbed("You haven't specified a time.\nUse `$mh mute` to get more information on how to use the command.","#64c166"))}
        if(!args[2]){return message.channel.send(ft.gaiaEmbed("You haven't specified a reason.\nUse `$mh mute` to get more information on how to use the command.","#64c166"))}
        // Necesarry variables for the Mute Command $mute <member> <time> <reason>
        let member = message.mentions.members.first() || message.guild.members.get(args[0]); // Specify the Member
        let muteRole = message.guild.roles.find(role => role.name === "muted");
        let reason = args.slice(2).join(" ");

        // Time Handling
        let timeString = args[1];

        if(timeString.includes("s")){
            let key = `${message.guild.id}-${member.id}`; // Set Array Key
            // Set to Seconds
            let time = timeString.replace("s", "");
            let timeNow = new Date().getTime() / 1000; // Current Time in seconds
            let timeInput = time;
            
            let unmuteTime = timeNow + timeInput;

              bot.muted[member.user.id] = {
                guild: message.guild.id,
                id: member.user.id,
                name: member.user.username,
                timeMuted: timeNow,
                timeUnmuted: unmuteTime,
                moderator: message.author.username
              };

            member.addRole(muteRole);

            fs.writeFile('./muted.json', JSON.stringify(bot.muted, null, 4), err => {
                if (err) throw err;
                message.channel.send(ft.gaiaEmbed(`${member.user.username} was succesfully muted for ${time} seconds!`, "#64c166"));
              });

            let embed = new Discord.RichEmbed()
            .setAuthor(`Gaia`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor("#e4a643")
            .setDescription("**Muted**")
            .addField("Name", member.user.username, true)
            .addField("Length", `${time} seconds`, true)
            .addField("Reason", reason)
            .addField("Moderator", message.author.username)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp();

            bot.channels.get("667065109050425354").send(embed);
            return

        } else if(timeString.includes("m")){
            // Set to Minutes
            let time = timeString.replace("m", "");

            let key = `${message.guild.id}-${member.id}`; // Set Array Key
            // Set to Seconds
            let timeNow = new Date().getTime() / 1000; // Current Time in seconds
            let timeInput = time * 60;
            
            let unmuteTime = timeNow + timeInput;

              bot.muted[member.user.id] = {
                guild: message.guild.id,
                id: member.user.id,
                name: member.user.username,
                timeMuted: timeNow,
                timeUnmuted: unmuteTime,
                moderator: message.author.username
              };

            member.addRole(muteRole);

            fs.writeFile('./muted.json', JSON.stringify(bot.muted, null, 4), err => {
                if (err) throw err;
                message.channel.send(ft.gaiaEmbed(`${member.user.username} was succesfully muted for ${time} seconds!`, "#64c166"));
              });
              
            let embed = new Discord.RichEmbed()
            .setAuthor(`Gaia`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor("#e4a643")
            .setDescription("**Muted**")
            .addField("Name", member.user.username, true)
            .addField("Length", `${time} minutes`, true)
            .addField("Reason", reason)
            .addField("Moderator", message.author.username)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp();

            bot.channels.get("667065109050425354").send(embed);
            return
        } else if(timeString.includes("h")){
            // Set to Hours
            let time = timeString.replace("h", "");

            let key = `${message.guild.id}-${member.id}`; // Set Array Key
            // Set to Seconds
            let timeNow = new Date().getTime() / 1000; // Current Time in seconds
            let timeInput = time * 3600;
            
            let unmuteTime = timeNow + timeInput;

              bot.muted[member.user.id] = {
                guild: message.guild.id,
                id: member.user.id,
                name: member.user.username,
                timeMuted: timeNow,
                timeUnmuted: unmuteTime,
                moderator: message.author.username
              };

            member.addRole(muteRole);

            fs.writeFile('./muted.json', JSON.stringify(bot.muted, null, 4), err => {
                if (err) throw err;
                message.channel.send(ft.gaiaEmbed(`${member.user.username} was succesfully muted for ${time} seconds!`, "#64c166"));
              });
              
            let embed = new Discord.RichEmbed()
            .setAuthor(`Gaia`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor("#e4a643")
            .setDescription("**Muted**")
            .addField("Name", member.user.username, true)
            .addField("Length", `${time} hours`, true)
            .addField("Reason", reason)
            .addField("Moderator", message.author.username)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp();

            bot.channels.get("667065109050425354").send(embed);
            return
        } else {
            // Set to Minutes if no time was specified
            // Set to Minutes
            let time = timeString.replace("m", "");

            let key = `${message.guild.id}-${member.id}`; // Set Array Key
            // Set to Seconds
            let timeNow = new Date().getTime() / 1000; // Current Time in seconds
            let timeInput = time * 60;
            
            let unmuteTime = timeNow + timeInput;

              bot.muted[member.user.id] = {
                guild: message.guild.id,
                id: member.user.id,
                name: member.user.username,
                timeMuted: timeNow,
                timeUnmuted: unmuteTime,
                moderator: message.author.username
              };

            member.addRole(muteRole);

            fs.writeFile('./muted.json', JSON.stringify(bot.muted, null, 4), err => {
                if (err) throw err;
                message.channel.send(ft.gaiaEmbed(`${member.user.username} was succesfully muted for ${time} seconds!`, "#64c166"));
              });
              
            let embed = new Discord.RichEmbed()
            .setAuthor(`Gaia`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setColor("#e4a643")
            .setDescription("**Muted**")
            .addField("Name", member.user.username, true)
            .addField("Length", `${time} minutes`, true)
            .addField("Reason", reason)
            .addField("Moderator", message.author.username)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp();

            bot.channels.get("667065109050425354").send(embed);
            return
        }
    } else {return message.channel.send(ft.gaiaEmbed("You do not have the required permissions to perform this command.", "#7289da"))}

}

module.exports.help = {
    name: "mute",
    aliases: ["m"],
    usage: "`$mute <mention | id> <time> <reason>`",
    description: "Temporarily Mute a user\n\nTime is specified as:\n`10` - 10 Minutes\n`10s` - 10 Seconds \n`10m` - 10 Minutes\n`10h` - 10 Hours",
    accessableBy: "Moderators"
}