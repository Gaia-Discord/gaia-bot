const Discord = require("discord.js");
const Canvas = require('canvas');
const fs = require("fs");

fs.readdir("./", (err, files) =>{ // Command folder
    let jsfile = files.filter(f => f.split(".").pop() === "js")
  
  });

module.exports.run = async (bot, message,args) => {

  let CommandPage = [ // Command Page Array
      '`help`\n`avatar`\n`ping`\n`serverinfo`\n`userinfo`', // Basic
      '`event\nleaderboard\nprofile\nreputation`', // Social
      '`enable`\n`disable`\n`role`' // User Management
    ]; 
  let UsagePage = [ // UsagePage Array
      '`$help`\n`$avatar <mention>`\n`$ping`\n`$serverinfo`\n`$userinfo [<mention>]`', // Basic
      '`$event <event>\n$leaderboard\n$profile [<mention | id | username]\n$rep <mention>`', // Social
      '`$enable <option>`\n`$disable <option>\n$role <role>`'
    ]; 
  let Category = [
      '**Basic**',
      '**Social**',
      '**User Management**'
  ]
  let description = "To get more information about a command use `$help <command>`.";
  let page = 1; // Page Default

  if(!args[0]){
    let embed = new Discord.RichEmbed()
      .setAuthor(`Gaia`, bot.user.displayAvatarURL)
      .setThumbnail(bot.user.displayAvatarURL)
      .setColor("#7289da")
      .addField("Command", `${CommandPage[0]}`, true)
      .addField("Usage", `${UsagePage[0]}`, true)
      .setDescription(description + `\n\nCategory: ${Category[0]}`)
      .setFooter(`[ Page ${page} / ${CommandPage.length} ] | Syntax: < > is required, [ ] is optional`);

    message.channel.send(embed).then(msg => {
      msg.react('◀️').then (r =>{ // Backwards Emote
        msg.react('▶️') // Forwards Emote
      })

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

      // On Backwards 
      backwards.on('collect', r => {
        if(page === 1) {return r.remove(r.users.filter(u => u === message.author).first());};
        page--;
        embed.fields = [];
        embed.addField("Command", CommandPage[page-1], true);
        embed.addField("Usage", UsagePage[page-1], true);
        embed.setFooter(`[ Page ${page} / ${CommandPage.length} ] | Syntax: < > is required, [ ] is optional`);
        embed.setDescription(description + `\n\nCategory: ${Category[page-1]}`);
        r.remove(r.users.filter(u => u === message.author).first());
        msg.edit(embed);
      })

      forwards.on('collect', r => {
        if(page === CommandPage.length) {return r.remove(r.users.filter(u => u === message.author).first());};
        page++;
        embed.fields = [];
        embed.addField("Command", CommandPage[page-1], true);
        embed.addField("Usage", UsagePage[page-1], true);
        embed.setFooter(`[ Page ${page} / ${CommandPage.length} ] | Syntax: < > is required, [ ] is optional`);
        embed.setDescription(description + `\n\nCategory: ${Category[page-1]}`);
        r.remove(r.users.filter(u => u === message.author).first());
        msg.edit(embed);
      })
    });
  }
    if(args[0]){
    let command = args[0];

    if(bot.commands.has(command)){
      command = bot.commands.get(command);

      if(command.help.accessableBy === "Moderators"){
        if(message.member.roles.find(r => r.name === "Gaia Permissions")){
          const avatar = "https://i.imgur.com/1OUJrDi.png";
          let embed = new Discord.RichEmbed()
                    .setAuthor(`Gaia`, avatar)
                    .setThumbnail(avatar)
                    .setColor("#64c166")
                    .addField("Command:", `**${command.help.name}**`)
                    .addField("Description:", `${command.help.description}`)
                    .addField("Usage:", `${command.help.usage}`)
                    .addField("Aliases:", "`$" + `${command.help.aliases}` + "`")
                    .addField("Accessible By:", `${command.help.accessableBy}`)
                    .setFooter("Syntax: < > is required, [ ] is optional.");

                message.channel.send(embed);
                return
      } else {return message.channel.send("This command is only available to Moderators.")}
    } else {

      let commandEmbed = new Discord.RichEmbed()
        .setAuthor(`Gaia`, bot.user.displayAvatarURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor("#7289da")
        .addField("Command:", `**${command.help.name}**`)
        .addField("Description:", `${command.help.description}`)
        .addField("Usage:", `${command.help.usage}`)
        .addField("Aliases:", "`$" + `${command.help.aliases}` + "`")
        .addField("Accessible By:", `${command.help.accessableBy}`)
        .setFooter("Syntax: < > is required, [ ] is optional.");

        message.channel.send(commandEmbed);
        return
    }
    
}}}

module.exports.help = {
    name: "help",
    aliases: ["help"],
    usage: "`$help`",
    description: "",
    accessableBy: "Members"
  }