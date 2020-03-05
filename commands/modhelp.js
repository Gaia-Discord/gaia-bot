const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

let ft = require('../index.js');

module.exports.run = async (bot, message,args) => {

    const avatar = "https://i.imgur.com/1OUJrDi.png";

    if(message.member.roles.find(r => r.name === "Gaia Permissions")){
        if(!args[0]){
            let embed = new Discord.RichEmbed()
                .setAuthor(`Gaia`, avatar)
                .setThumbnail(avatar)
                .setColor("#64c166")
                .addField("Command", "`modhelp`\n`random`\n`purge`\n`when`", true)
                .addField("Usage", "`$modhelp`\n`$random <input1 input2 ...>`\n`$purge <amount>`\n`$when remove <countdown-name>`", true)
                .setDescription("To get more information about a command use `$modhelp <command>`.")
                .setFooter("Syntax: < > is required, [ ] is optional.");
    
            message.channel.send(embed);
            return
        }
        if(args[0]){
            let command = args[0];
            if(bot.commands.has(command)){
                command = bot.commands.get(command);

                let embed = new Discord.RichEmbed()
                    .setAuthor(`Gaia`, avatar)
                    .setThumbnail(avatar)
                    .setColor("#64c166")
                    .addField("Command:", `**${command.help.name}**`)
                    .addField("Description:", `${command.help.description}`)
                    .addField("Usage:", `${command.help.usage}`)
                    .addField("Aliases:", "`$" + `${command.help.aliases}` + "`")
                    .addField("Accessable By:", `${command.help.accessableBy}`)
                    .setFooter("Syntax: < > is required, [ ] is optional.");

                message.channel.send(embed);
                return
            } else { return message.channel.send("That command could not be found.")}
        }
    } else {return message.channel.send(ft.gaiaEmbed("You do not have the required permissions to perform this command.", "#7289da"))}

    
}

module.exports.help = {
    name: "modhelp",
    aliases: ["mh"],
    usage: "`$modhelp` - **Bring up the list of Mod Commands**\n`$modhelp [<command>]` - **Get more detail for a Command**",
    description: "List of commands only available to Moderators.",
    accessableBy: "Moderators"
  }