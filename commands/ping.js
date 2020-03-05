const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

module.exports.run = async (bot, message,args) => {
    const m = await message.channel.send("Ping");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
}

module.exports.help = {
    name: "ping",
    aliases: ["ping"],
    usage: "`$ping`",
    description: "Check latency between the Bot and the Websocket.",
    accessableBy: "Members"
  }