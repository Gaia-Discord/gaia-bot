const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

module.exports.run = async (bot, message,args) => {
    myEnmap.set("EventList", ["E3", "GamesOfTheDecade"]);
    var list = myEnmap.fetch("EventList").join(', ');

    var d = new Date(message.member.joinedAt);
    var date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear(); // Date User joined formatted
    
    var minDate = new Date('06/07/2019');
    var maxDate = new Date('06/20/2019');

    var role = message.guild.roles.find(role => role.name === "E3 2019");

    if(!args.length){return message.channel.send(`Please provide an Event. \n- **List of Events**: **[**${list}**]**` + '\n- **Example**: `$event E3` | `$event info E3`');}
    else if(args[0] === "E3"){ // E3 Date Checker
        if(message.member.roles.find(r => r.name === "E3 2019")){
            message.channel.send("You already have the **E3 2019** role.");
        } else {
            if (d > minDate && d < maxDate ){
                message.channel.send(`You joined ${date}, so you are eligible to receive the **E3 2019** role.`);
                message.member.addRole(role);
            } else {
                message.channel.send(`You joined ${date}, so you are **not** eligible to receive the **E3 2019** role.`)
            }}}

    else if(args[0] === "GamesOfTheDecade"){
        message.channel.send("To be eligible to receive this role, you must have participated in the **Games of the Decade** event, roles are handed out manually.");
    }

    else if(args[0] === "info"){
        if(!args[1]){
            message.channel.send(`Please provide an Event. \n- **List of Events**: **[**${list}**]**` + '\n- **Example**: `$event info E3`');
        } else if(args[1] === "E3"){
            message.channel.send("To get this role you must have joined (or been apart of) the server during (and the week following) **E3 2019**.")
        } else if(args[1] === "GamesOfTheDecade"){
            message.channel.send("To get this role you must have participated in the **Games of the Decade** Event.")
        } else {
            message.channel.send(`This is not an event. \n- **List of Events**: **[**${list}**]**`)
        }
    }

    else if(args[0] === "list"){
        message.channel.send(`**List of Events**: **[**${list}**]**`)
    }

    else {
        message.channel.send(`"${args[0]}" is not an Event.\n **List of Events**: **[**${list}**]** `)
    }



    
}

module.exports.help = {
    name: "event",
    aliases: ["e"],
    usage: "`$event <role>`",
    description: "Give yourself (or get information about) an assignable Event role: [**E3**, **GamesOfTheDecade**]",
    accessableBy: "Members"
  }