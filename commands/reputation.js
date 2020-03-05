const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});
let ft = require('../index.js');

module.exports.run = async (bot, message,args,tools) => {
    const key = `${message.guild.id}-${message.author.id}`; // Set Key
    bot.reputationCount = new Enmap({name: "repCount"});
    bot.reputation = new Enmap({name: "rep"});
    bot.reputation.ensure(key, {rep: 0}); // Ensure lastRep is 0 on new users
    bot.reputationCount.ensure(key, {repCount: 0}); // Ensure Reputation is 0 on new users

    if(!args[0]){return message.channel.send(ft.gaiaEmbed("Please mention a user to give reputation to.", "#7289da"))}
    
    var lastRep = bot.reputation.get(key, "rep"); // Seconds since 1/1/1970
    var nextRep = lastRep + 50400; // Next Reputation = LastRep + 24 Hours

    var currentTime = Math.floor(Date.now() / 1000); // Current time in Seconds

    var secondsLeft = nextRep - currentTime; // SecondsLeft is 

    let hours = Math.floor(secondsLeft / 3600); // Hours Left
    let minutes = Math.floor((secondsLeft - (hours * 3600)) / 60); // Minutes Left
    let seconds = secondsLeft - (hours * 3600) - (minutes * 60); // Seconds Left

    if(args[0] === "timeleft"){
        if(secondsLeft > 0){
            return message.channel.send(ft.gaiaEmbed(`You can give more reputation in **${hours} hours**, **${minutes} minutes** and **${seconds} seconds**.`, "#7289da"));
        } else {
            return message.channel.send(ft.gaiaEmbed("You can award a reputation point!", "#7289da"));
        }
    }

    var user = message.mentions.members.first() || tools.autocomplete(message, args.join(' '));
    var userID = user.id;

    if(userID === message.author.id){return message.channel.send(ft.gaiaEmbed("You cannot give yourself reputation.", "#7289da"))} // Make sure users cannot give themselves Reputation

    if(secondsLeft <= 0){
        // Can Give Reputation
        const key = `${message.guild.id}-${userID}`; // Set Key to Mentioned User
        const key2 = `${message.guild.id}-${message.author.id}`; // Set Second Key to Author
        bot.reputationCount.ensure(key, {repCount: 0}); // Ensure Mentioned User has Reputation

        bot.reputationCount.inc(key, "repCount"); // Increase Reputation of mentioned user

        bot.reputation.set(key2, currentTime, "rep"); // Set Authors lastRep to currentTime

        message.channel.send(ft.gaiaEmbed(`Succesfully gave ${user} a Reputation point!`, "#7289da"));
        return
    } else if(secondsLeft > 0){
        // Cannot Give Reputation
        message.channel.send(ft.gaiaEmbed(`You can give more reputation in **${hours} hours**, **${minutes} minutes** and **${seconds} seconds**.`, "#7289da"));
        return
    }
    
}

module.exports.help = {
    name: "reputation",
    aliases: ["rep"],
    usage: "`$rep <mention>` - **Give a reputation point**\n`$rep timeleft` - **Check when you can award a Reputation point**",
    description: "Give another user Reputation (Visible on their Profile), resets every 24 hours.",
    accessableBy: "Members"
  }