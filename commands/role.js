const Discord = require("discord.js");

module.exports.run = async (bot, message,args) => {
    var PCrole = message.guild.roles.find(role => role.name === "PC");
    var PSrole = message.guild.roles.find(role => role.name === "PS4");
    var XBOXrole = message.guild.roles.find(role => role.name === "XBOX");

    if(!args.length){return message.channel.send(`Please provide a Role. \n- **List of Roles**: **[**PC, PS4, XBOX**]**` + '\n- **Example**: `$role PC` | `$role remove PC`');}
    else if(args[0] === "PC"){
        if(message.member.roles.find(r => r.name === "PC")){
            message.channel.send("You already have the **PC** role. If you want to remove the role use: `$role remove PC`");
        } else{
            message.channel.send("Added the **PC** role.");
            message.member.addRole(PCrole);
        }
    }

    else if(args[0] === "PS4"){
        if(message.member.roles.find(r => r.name === "PS4")){
            message.channel.send("You already have the **PS4** role. If you want to remove the role use: `$role remove PS4`");
        } else{
            message.channel.send("Added the **PS4** role.");
            message.member.addRole(PSrole);
        }
    }

    else if(args[0] === "XBOX"){
        if(message.member.roles.find(r => r.name === "XBOX")){
            message.channel.send("You already have the **XBOX** role. If you want to remove the role use: `$role remove XBOX`");
        } else{
            message.channel.send("Added the **XBOX** role.");
            message.member.addRole(XBOXrole);
        }
    }

    else if(args[0] === "remove"){
        if(!args[1]){
            message.channel.send(`Please provide a Role to remove. \n- **List of Roles**: **[**PC, PS4, XBOX**]**` + '\n- **Example**: `$role remove PC`')
        } else if(args[1] === "PC"){
            if(message.member.roles.find(r => r.name === "PC")){
                message.channel.send("Removed the **PC** role.");
                message.member.removeRole(PCrole);
            } else{
                message.channel.send("You do not have the **PC** role. If you want to add the role use: `$role PC`");
            }
        } else if(args[1] === "PS4"){
            if(message.member.roles.find(r => r.name === "PS4")){
                message.channel.send("Removed the **PS4** role.");
                message.member.removeRole(PSrole);
            } else{
                message.channel.send("You do not have the **PS4** role. If you want to add the role use: `$role PS4`");
            }
        } else if(args[1] === "XBOX"){
            if(message.member.roles.find(r => r.name === "XBOX")){
                message.channel.send("Removed the **XBOX** role.");
                message.member.removeRole(XBOXrole);
            } else{
                message.channel.send("You do not have the **XBOX** role. If you want to add the role use: `$role XBOX`");
            }
        }
    }
}

module.exports.help = {
    name: "role",
    aliases: ["r"],
    usage: "`$role <role>`",
    description: "Give yourself an assignable role: [**PC**, **XBOX**, **PS4**]",
    accessableBy: "Members"
}