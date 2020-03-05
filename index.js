const botconfig = require("./config.json"); // Bot config
const Discord = require("discord.js"); 
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true})
const Enmap = require("enmap");
const tools = require('./functions.js');

bot.points = new Enmap({name: "points"});
bot.color = new Enmap({name: "color"});
bot.muted = require('./muted.json');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const muteArray = bot.mute;

// Embed Function
function gaiaEmbed(text, color) { // Embed Function because I am too lazy to write up the RichEmbed everytime
  let embed = new Discord.RichEmbed()
  .setColor(color)
  .setDescription(text);
  return embed;
} module.exports.gaiaEmbed = gaiaEmbed;

// Calculate Time Until Function
function timeUntil(time, name) { // Takes Timestamp value
  var currentTime = Math.floor(Date.now() / 1000);
  var secondsLeft = time - currentTime;

  let days = Math.floor(secondsLeft / 86400);
  let hours = Math.floor((secondsLeft - (days * 86400)) / 3600)
  let minutes = Math.floor((secondsLeft - (days * 86400) - (hours * 3600)) / 60);
  let seconds = secondsLeft - (days * 86400) - (hours * 3600) - (minutes * 60);

  let embed = new Discord.RichEmbed()
  .setColor("#7289da")
  .setDescription(`The ${name} countdown ends in **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds**.`);

  return embed;
} module.exports.timeUntil = timeUntil;

fs.readdir("./commands/", (err, files) =>{ // Command folder
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands."); // Throws Error when no Commands are found
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`); // Logs all loaded commands to the Console
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name)
  });
  });

});

bot.on('ready', () => { 
  bot.user.setActivity(`$help | ${bot.guilds.size} servers`); 

  // Check Muted users

  let channelTest = bot.channels.get("667065109050425354");
  setInterval(() => {
    for (const i in bot.muted) {
      let currentTime = Math.floor(Date.now() / 1000);
      const time = bot.muted[i].timeUnmuted;
      let channel = bot.channels.get("667065109050425354"); // Specific Channel, grab from config in the future.
      let timeLeft = time - currentTime;
      let name = bot.muted[i].name;
      let guildName = bot.guilds.get(bot.muted[i].guild);
      let muteRole = guildName.roles.find(role => role.name === "muted")
      let member = guildName.members.get(i)
      let moderator = bot.muted[i].moderator;

      if (!muteRole) continue;

      if (timeLeft <= 0) {
        member.removeRole(muteRole);

        let embed = new Discord.RichEmbed()
            .setAuthor(`Gaia`, bot.user.displayAvatarURL)
            .setColor("#6dd662")
            .setDescription("**Unmuted**")
            .addField("Name", name, true)
            .addField("Moderator", moderator, true)
            .addField("Reason", "Mute Expired")
            .setFooter(`ID: ${bot.muted[i].id}`)
            .setTimestamp();

            channel.send(embed);

        delete bot.muted[i];
        fs.writeFile('./muted.json', JSON.stringify(bot.muted), err => {
            if(err) throw err;
        });
      }
    }
  }, 5000);
})
  

let prefix = "$"; // Default Prefix

bot.on("message", async message => {
  if(message.channel.type === "text"){
    if(message.author.bot) return; // Ignores other bots
    if (message.content.startsWith(prefix)){
      let messageArray = message.content.split(/ +/);
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
      if(commandfile) commandfile.run(bot,message,args,tools);
    }
  };

  if (message.guild) { // XP system
    if(message.channel.id === "592067902421860356"){return;}
    const key = `${message.guild.id}-${message.author.id}`;

    bot.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
      color: "#7289da"
    });

    // Reset Countdown if the timer is up
    bot.when = new Enmap({name: "whenCountdown"});

    let currentTime = Math.floor(Date.now() / 1000); 
    let array = bot.when;

    function checkTime(value, key, map) { 
      let time = bot.when.get(key, "time");
      let timeLeft = time - currentTime;
      if(timeLeft <= 0){
        bot.channels.get("592067902421860356").send(`The ${key} countdown has been removed because it has finished.`); // Specific Channel, grab from config in the future.
        bot.when.delete(key);
        return
      }
    }

    array.forEach(checkTime); // Check if Countdowns are done yet.
    bot.points.inc(key, "points"); // Increase XP
    const curLevel = Math.floor(0.3 * Math.sqrt(bot.points.get(key, "points")));

    if (bot.points.get(key, "level") < curLevel) { // Level Up Mechanism
      bot.disable = new Enmap({name: "disable"}); // Establish Database for Disable option
      bot.disable.ensure(key, {disable: false});

      if(bot.disable.get(key, "disable") === false){
        bot.points.set(key, curLevel, "level");
      } else {
        bot.points.set(key, curLevel, "level");
      }
    }
  }
});



bot.login(botconfig.token);