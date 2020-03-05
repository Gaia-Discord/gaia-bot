const Discord = require("discord.js");

module.exports.run = async (bot, message,args) => {
    await message.delete(); // Delete the command message
    if(message.member.roles.find(r => r.name === "pin-permission")){ // Check for sufficient permissions
        if(isNaN(args[0])){
            message.channel.send("This is not a valid ID.").then(msg => msg.delete(5000)); // If the Argument is not a Number
        } else{
            message.channel.fetchMessage(args[0]) // Find the message by ID
                .then(msg => msg.pin()) // Pin the Message
                .catch(console.error); // Catch the Error
        }
    } else {
        message.channel.send("You do not have sufficient permissions to pin messages.").then(msg => msg.delete(5000)); 
    }

    return // Close
}

module.exports.help = {
    name: "pin",
    aliases: ["Nothing2"],
    usage: "$pin",
    description: "",
    accessableBy: "Moderators"
}