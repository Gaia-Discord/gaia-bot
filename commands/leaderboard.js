const Discord = require("discord.js");
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const fetch = require("node-fetch"); // This is to fetch the user avatar and convert it to a buffer.
Canvas.registerFont(resolve(join(__dirname, "discord.otf")), "Discord");
const Enmap = require("enmap");
let ft = require('../index.js');

module.exports.run = async (bot, message,args) => {
  const imageUrlRegex = /\?size=2048$/g;
    const filtered = bot.points.filter( p => p.guild === message.guild.id ).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top5 = sorted.splice(0, 5);

    var key = "";
    var yCord = 0;
    var pos = [0, 60, 120, 180, 240];
    var pos2 = [60, 60, 120, 180, 240];
    var iPos = [30, 90, 150, 210, 270];
    var colors = ["#FFD700", "#C0C0C0", "#b9722d", "#FFFFFF", "#FFFFFF"];
    var bColors = ["#FFD700", "#C0C0C0", "#b9722d", "#33363d", "#33363d"];

    bot.color = new Enmap({name: "color"});
    if(args.includes('-amount')){
      let amount = args[1];
      let numbercheck = /^[0-9]*$/;

      if(!args[1]){return message.channel.send(ft.gaiaEmbed("Please provide a number! `$lb -amount <1-15>`", "#7289da"))};

      if(numbercheck.test(args[1])){
        if(args[1] < 1 || args[1] > 15){return message.channel.send(ft.gaiaEmbed("Please provide a number within a range of **15**.", "#7289da"))};
        const filtered = bot.points.filter( p => p.guild === message.guild.id ).array();
        const sorted = filtered.sort((a, b) => b.points - a.points);
        const topAmount = sorted.splice(0, args[1]);

        const embed = new Discord.RichEmbed()
          .setTitle("Leaderboard")
          .setAuthor(`${bot.user.username} // ${message.guild.name}`, bot.user.avatarURL)
          .setDescription(`Top ${args[1]} of the Server`)
          .setColor(0x00AE86);
        for(const data of topAmount) {
          if(bot.users.get(data.user) == undefined){
            embed.addField(`[ User Left Server ]`, `${data.points} points (level ${data.level})`);
          } else {
            embed.addField(`${bot.users.get(data.user).username}#${bot.users.get(data.user).discriminator}`, `${data.points} xp (level ${data.level})`);
          }
        }
        return message.channel.send({embed});
      } else {
        return message.channel.send(ft.gaiaEmbed("You have not provided a valid number.", "#7289da"));
      }
    }

    if(args.includes('-image')){
      bot.points = new Enmap({name: "points"});
      const canvas = new Canvas(475, 300)
      //.setColor("#161616")
      .setColor("#222327")
      .addRect(0, 0, 475, 300)

      for(const data of top5) {
          const id = bot.users.get(data.user).id;
          const av = bot.users.get(data.user).avatar;
          const n = bot.users.get(data.user).username;
          key = `${message.guild.id}-${id}`;

          const { level, points } = bot.points.get(key);

          const previousLevel = Math.floor((level / 0.3) ** 2);
		      const nextLevel = Math.floor(((level + 1) / 0.3) ** 2);
		      const progressBar = Math.max(Math.round(((points - previousLevel) / (nextLevel - previousLevel)) * 128), 6);

          const name = n.length > 20 ? n.substring(0, 17) + "..." : n;

          const result = await fetch(`https://cdn.discordapp.com/avatars/${id}/${av}.png`);
          const avatar = await result.buffer();

          //canvas.setColor(`${bot.color.get(key, "color")}`)
          //canvas.addRect(470, pos[yCord], 5, 60)

          canvas.addCircularImage(avatar, 65, iPos[yCord], 20)

          canvas.setTextFont("14pt Discord")
          canvas.setColor(colors[yCord])
          canvas.addText(name, 93, (iPos[yCord] + 7) )

          canvas.setColor(bColors[yCord])
          canvas.addRect(0, pos[yCord], 33, 60)

          canvas.setColor("#FFFFFF")
          canvas.addText(`${(yCord + 1)}`, 11, (iPos[yCord] + 8) )

          canvas.setColor("#7289d9")
          //canvas.addCircle(445, iPos[yCord], 15)


          canvas.addBeveledRect(430, (iPos[yCord] - 7), 25, 15, 3)

          canvas.setTextFont("11pt Discord")
          canvas.setColor("#FFFFFF")
          canvas.addText(top5[yCord].level, 436, (iPos[yCord] + 6));

          canvas.setColor(`#42474d`)
          canvas.addBeveledRect(300, (iPos[yCord] - 7), 128, 15, 3)

          canvas.setColor(`#64c166`)
          canvas.addBeveledRect(300, (iPos[yCord] - 7), progressBar, 15, 3)

          canvas.setColor("#1c1c1c")
          canvas.addRect(0, pos2[yCord], 475, 1)
          yCord++;
        }

      const result = canvas.toBuffer();

      const attachment = new Discord.Attachment(result, 'leaderboard.png');
      message.channel.send(attachment);
      return
    }

    if(args.includes('-image-full')){
      
      var Fpos = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540];
      var Fpos2 = [60, 60, 120, 180, 240, 300, 360, 420, 480, 540];
      var FiPos = [30, 90, 150, 210, 270, 330, 390, 450, 510, 570];
      var Fcolors = ["#FFD700", "#C0C0C0", "#b9722d", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
      var FbColors = ["#FFD700", "#C0C0C0", "#b9722d", "#33363d", "#33363d", "#33363d", "#33363d", "#33363d", "#33363d", "#33363d"];
      bot.points = new Enmap({name: "points"});

      const Ffiltered = bot.points.filter( p => p.guild === message.guild.id ).array();
      const Fsorted = Ffiltered.sort((a, b) => b.points - a.points);
      const top10 = Fsorted.splice(0, 10);

      const canvas = new Canvas(475, 600)
      //.setColor("#161616")
      .setColor("#222327")
      .addRect(0, 0, 475, 600)

      for(const data of top10) {
        if(bot.users.get(data.user) == undefined){
          const nResult = await fetch('https://i.imgur.com/ZrNbp4r.png');
          const noAvatar = await nResult.buffer();

          canvas.setTextAlign('start')
          canvas.addCircularImage(noAvatar, 65, FiPos[yCord], 20)
          canvas.setTextFont("14pt Discord")
          canvas.setColor(Fcolors[yCord])
          canvas.addText("[ User Left Server ]", 93, (FiPos[yCord] + 7) )
          canvas.setColor(FbColors[yCord])
          canvas.addRect(0, Fpos[yCord], 33, 60)
          canvas.setColor("#FFFFFF")
          canvas.addText(`${(yCord + 1)}`, 11, (FiPos[yCord] + 8) )
          canvas.setColor("#1c1c1c")
          canvas.addRect(0, Fpos2[yCord], 475, 1)
          yCord++;
        } else {
          const id = bot.users.get(data.user).id;
          const av = bot.users.get(data.user).avatar;
          const n = bot.users.get(data.user).username;
          key = `${message.guild.id}-${id}`;

          const { level, points } = bot.points.get(key);

          const previousLevel = Math.floor((level / 0.3) ** 2);
		      const nextLevel = Math.floor(((level + 1) / 0.3) ** 2);
		      const progressBar = Math.max(Math.round(((points - previousLevel) / (nextLevel - previousLevel)) * 128), 6);

          const name = n.length > 20 ? n.substring(0, 17) + "..." : n;

          const result = await fetch(`https://cdn.discordapp.com/avatars/${id}/${av}.png`);
          const avatar = await result.buffer();

          canvas.setTextAlign('start')
          canvas.addCircularImage(avatar, 65, FiPos[yCord], 20)
          canvas.setTextFont("14pt Discord")
          canvas.setColor(Fcolors[yCord])
          canvas.addText(name, 93, (FiPos[yCord] + 7) )

          canvas.setColor(FbColors[yCord])
          canvas.addRect(0, Fpos[yCord], 33, 60)

          canvas.setColor("#FFFFFF")
          canvas.addText(`${(yCord + 1)}`, 11, (FiPos[yCord] + 8) )

          canvas.setColor("#7289d9")
          canvas.addBeveledRect(430, (FiPos[yCord] - 7), 25, 15, 3)

          canvas.setTextFont("11pt Discord")
          canvas.setColor("#FFFFFF")
          canvas.setTextAlign('center')
          canvas.addText(top10[yCord].level, 442, (FiPos[yCord] + 6));

          canvas.setColor(`#42474d`)
          canvas.addBeveledRect(300, (FiPos[yCord] - 7), 128, 15, 3)

          canvas.setColor(`#64c166`)
          canvas.addBeveledRect(300, (FiPos[yCord] - 7), progressBar, 15, 3)

          canvas.setColor("#1c1c1c")
          canvas.addRect(0, Fpos2[yCord], 475, 1)
          yCord++;
        }
      }

      const result = canvas.toBuffer();

      const attachment = new Discord.Attachment(result, 'leaderboard.png');
      message.channel.send(attachment);
      return
    }

    
    const filtered2 = bot.points.filter( p => p.guild === message.guild.id ).array();
    const sorted2 = filtered2.sort((a, b) => b.points - a.points);

    const top10 = sorted2.splice(0, 10);
    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setAuthor(`${bot.user.username} // ${message.guild.name}`, bot.user.avatarURL)
      .setDescription("Top 10 of the Server")
      .setColor(0x00AE86);
    for(const data of top10) {
      if(bot.users.get(data.user) == undefined){
        embed.addField(`[ User Left Server ]`, `${data.points} points (level ${data.level})`);
      } else {
        embed.addField(`${bot.users.get(data.user).username}#${bot.users.get(data.user).discriminator}`, `${data.points} xp (level ${data.level})`);
      }
    }
    return message.channel.send({embed});
}

module.exports.help = {
  name: "leaderboard",
  aliases: ["lb"],
  usage: "`$leaderboard`",
  description: "Displays the current Top 10 users with the most XP.\n\n**Parameters:**\n`$lb -image` - Image Top 5\n`$lb -amount <1-15>` - Adjustable Range",
  accessableBy: "Members"
}