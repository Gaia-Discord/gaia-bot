const Discord = require("discord.js");
const Enmap = require("enmap");
let ft = require('../index.js');
const axios = require('axios').default;
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const fetch = require("node-fetch"); // This is to fetch the user avatar and convert it to a buffer.
const fsn = require("fs-nextra");
Canvas.registerFont(resolve(join(__dirname, "Borda.ttf")), "Borda");
Canvas.registerFont(resolve(join(__dirname, "Rajdhani.ttf")), "Rjd");
Canvas.registerFont(resolve(join(__dirname, "Rajdhani-Medium.ttf")), "Rjd-M");
Canvas.registerFont(resolve(join(__dirname, "Rajdhani-Bold.ttf")), "Rjd-B");
Canvas.registerFont(resolve(join(__dirname, "Rajdhani-SemiBold.ttf")), "Rjd-SB");


module.exports.run = async (bot, message,args) => {

  if(!args[0]){return message.channel.send("**Usage**: `$getstats <option> <name> <platform> [--embed]` ([ ] is optional)\n\n**Options**: `Division`, `Modern Warfare`\n**Platforms**: `PC`, `PSN`, `XBL`")}
  if(!args[1]){return message.channel.send("Please provide a **name**! Do: `$getstats` to get command usage information.")}
  if(!args[2]){return message.channel.send("Please provide a **platform**! Do: `$getstats` to get command usage information.")}


  var platform = "";
  if(args[0].toLowerCase() === "division"){platform = "uplay"}
  else{platform = args[2].toLowerCase()}

  const option = args[0].toLowerCase();
  const name = args[1].toLowerCase();
  const bg = await fsn.readFile('background.jpg');
  const icon = await fsn.readFile('shd-icon.png');
  const DZicon = await fsn.readFile('DZ-icon.png');

  //https://public-api.tracker.gg/v2/division-2/standard/profile/${platform}/${name}

  if(option === "modernwarfare"){
    var name2 = "";
    var pltfrm = "";
    if(args[2] === "PC"){
      name2 = args[1].replace("#", "%23");
      pltfrm = "battle";
    } else{name2 = args[1]; pltfrm = args[2].toLowerCase();}
    axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/${pltfrm}/gamer/${name2}/profile/type/mp`)
    .then(response => {
      const res = response.data.data;

      const name = res.username;
      const level = res.level;
      const xp = res.totalXp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const kills = res.lifetime.all.properties.kills;
      const deaths = res.lifetime.all.properties.deaths;
      const wins = res.lifetime.all.properties.wins;
      const losses = res.lifetime.all.properties.losses;
      const kd = Math.round((res.lifetime.all.properties.kdRatio + Number.EPSILON) * 100) / 100
      const hours = Math.round(res.lifetime.all.properties.timePlayedTotal / 3600);

      const embed = new Discord.RichEmbed()
              .setColor('#86A1BF')
              .setAuthor(name)
              .setThumbnail("https://i.imgur.com/ZiJYWTC.png")
              .addField('Name', name, true)
              .addField('Time Played', `${hours}h`, true)
              .addField('Level', level, true)
              .addField('Kills', kills, true)
              .addField('Deaths', deaths, true)
              .addField('K/D', kd, true)
              .addField('Wins', wins, true)
              .addField('Losses', losses, true)
              .addField('XP', xp, true);

          message.channel.send(embed);
          return
    })
    .catch(error => {
      message.channel.send("User not found on that Platform.")
      console.log(error);
    });
  }

  if(option === "division"){
    axios.get(`https://public-api.tracker.gg/v2/division-2/standard/profile/${platform}/${name}`, {'headers':{'TRN-Api-Key':'40b4e9dd-e79d-494e-963c-41f5a78d0849'}})
      .then(response => {
        const res = response.data.data;

        const name = res.platformInfo.platformUserHandle;
        const avatar = res.platformInfo.avatarUrl;
        const timePlayed = res.segments[0].stats.timePlayed.value;
        const timePlayedHours = Math.round(timePlayed / 3600);
        const pvpKills = res.segments[0].stats.killsPvP.displayValue;
        const pveKills = res.segments[0].stats.killsNpc.displayValue;
        const xp = res.segments[0].stats.xPTotal.displayValue;
        const level = res.segments[0].stats.highestPlayerLevel.displayValue;
        const DZlevel = res.segments[0].stats.rankDZ.displayValue;
        const gs = res.segments[0].stats.latestGearScore.displayValue;

        var background = "";
        if(platform === "uplay"){
          background = "https://i.imgur.com/aMdIThU.png";
        } else if(platform === "psn"){
          background = "https://i.imgur.com/evd8n9t.png";
        } else if(platform === "xbl"){
          background = "https://i.imgur.com/PqdUB4B.png";
        }

        if(args[3] === "--embed"){
          const embed = new Discord.RichEmbed()
              .setColor('#ff6d10')
              .setAuthor(name, background)
              .setThumbnail(avatar)
              .addField('Name', name, true)
              .addField('Time Played', `${timePlayedHours}h`, true)
              .addField('PVP Kills', pvpKills, true)
              .addField('PVE Kills', pveKills, true)
              .addField('Level', level, true)
              .addField('Dark Zone Level', DZlevel, true)
              .addField('Gear Score', gs, true)
              .addField('XP', xp, true);

          message.channel.send(embed);
          return
        }

        const DivisionCanvas = new Canvas(400, 91)
        .setColor("#7289DA")
        .addRect(0, 0, 475, 300)


        var grd = DivisionCanvas.createLinearGradient(0, 0, 200, 0);
        grd.addColorStop(0, "rgba(255,179,26,.4)");
        grd.addColorStop(1, "transparent");

        var grd2 = DivisionCanvas.createLinearGradient(270, 0, 20, 0);
        grd2.addColorStop(0, "rgba(162,93,255,.3)");
        grd2.addColorStop(1, "transparent");

        DivisionCanvas.addImage(bg, 0, 0)

        // Dark Background
        DivisionCanvas.setColor("rgba(0,0,0,.24)")
        DivisionCanvas.addRect(20,20,176,52)

        // Gradient
        DivisionCanvas.setColor(grd)
        DivisionCanvas.addRect(20, 20, 176, 52)

        // Stroked Main
        DivisionCanvas.setStroke("rgba(255,255,255,.24)") 
        DivisionCanvas.addStrokeRect(20, 20, 176, 52)

        // Left Bar
        DivisionCanvas.setColor("#ffb31a")
        DivisionCanvas.addRect(20, 20, 7, 52)

        // Dark Background for level
        DivisionCanvas.setColor("rgba(0,0,0,.24)")
        DivisionCanvas.addRect(195,20,52,52)

        // Level
        DivisionCanvas.addStrokeRect(195, 20, 52, 52)
        DivisionCanvas.addImage(icon, 35, 27)

        // Dots
        /*
        DivisionCanvas.setColor("#ffffff")
        DivisionCanvas.addRect(19, 19, 2, 2)
        DivisionCanvas.addRect(19, 72, 2, 2)

        DivisionCanvas.addRect(194, 18, 2, 2)
        DivisionCanvas.addRect(194, 72, 2, 2)

        DivisionCanvas.addRect(247, 20, 2, 2)
        DivisionCanvas.addRect(247, 72, 2, 2)*/

        // Text
        DivisionCanvas.setColor("#ffb31a")
        DivisionCanvas.setTextFont("13px Rjd-M")
        DivisionCanvas.addText("Gear Score", 90, 42)
        DivisionCanvas.addText("Level", 207, 42)

        DivisionCanvas.setColor("#ffffff")
        DivisionCanvas.setTextFont("24px Rjd-SB")
        DivisionCanvas.addText(`${gs}`, 90, 62)
        DivisionCanvas.addText(`${level}`, 208, 62)

        // DZ Dark background
        DivisionCanvas.setColor("rgba(0,0,0,.24)")
        DivisionCanvas.addRect(270,20,57,52)

        // DZ Gradient
        DivisionCanvas.setColor(grd2)
        DivisionCanvas.addRect(270, 20, 57, 52)

        // DZ
        DivisionCanvas.addStrokeRect(270, 20, 57, 52)
        DivisionCanvas.addImage(DZicon, 286, 32)

        // DZ Left bar
        DivisionCanvas.setColor("#a25dff")
        DivisionCanvas.addRect(270, 20, 7, 52)

        // DZ Level
        DivisionCanvas.addStrokeRect(327, 20, 52, 52)

        //DZ LEVEL TEXT
        DivisionCanvas.setColor("#a25dff")
        DivisionCanvas.setTextFont("13px Rjd-M")
        DivisionCanvas.addText("Level", 339, 42)
        
        // DZ Value
        DivisionCanvas.setColor("#ffffff")
        DivisionCanvas.setTextFont("24px Rjd-SB")
        DivisionCanvas.setTextAlign("center")
        DivisionCanvas.addText(`${DZlevel}`, 352, 62)

        const result = DivisionCanvas.toBuffer();

        const attachment = new Discord.Attachment(result, 'stats.png');

        message.channel.send(attachment);

        /*
        const embed = new Discord.RichEmbed()
        .setColor('#ff6d10')
        .setAuthor(name, background)
        .setThumbnail(avatar)
        .addField('Name', name, true)
        .addField('Time Played', `${timePlayedHours}h`, true)
        .addField('PVP Kills', pvpKills, true)
        .addField('PVE Kills', pveKills, true)
        .addField('Level', level, true)
        .addField('Gear Score', gs, true)
        .addField('XP', xp, true);*/
    })
      .catch(error => {
        message.channel.send("User not found on that Platform.")
        console.log(error);
    });
  }

}

module.exports.help = {
    name: "getstats",
    aliases: ["gs"],
    usage: "`$gs <option> <name> <platform>` - **Get Stats**",
    description: "Test!",
    accessableBy: "Members"
  }