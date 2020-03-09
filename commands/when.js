const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});
const sm = require('string-similarity');

let ft = require('../index.js');

function isDate(date) {
    var dateRegex = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
    return dateRegex.test(date);
}

module.exports.run = async (bot, message,args) => {
    bot.when = new Enmap({name: "whenCountdown"});

    if(!args[0]){
        let array = bot.when;
        let arrayCollection = [];
        function logMapElements(value, key, map) {
            arrayCollection.push(key)
        }
        array.forEach(logMapElements);
        var output = arrayCollection.join("`,`");
        return message.channel.send(ft.gaiaEmbed(`Please provide something to count down to.\n\n**Currently available Countdowns:**\n` + "`" + output + "`", "#7289da"));
    }
    let input = args[0];

//  Create Countdown
    if(input === "remove"){
        if(message.member.roles.find(r => r.name === "Gaia Permissions")){
            if(!args[1]){return message.channel.send(ft.gaiaEmbed("**Usage**: `$when remove <countdown-name>`", "#64c166"))}
            let countdownToRemove = args[1];

            if(!bot.when.has(args[1])){return message.channel.send(ft.gaiaEmbed(`There is no countdown with the name: ${args[1]}, make sure it's spelled correctly.`, "#64c166")) }

            bot.when.delete(countdownToRemove);
            message.channel.send(ft.gaiaEmbed(`Succesfully removed the ${args[1]} countdown!`, "#64c166"))
            return 
        } else {
            return message.channel.send(ft.gaiaEmbed("You do not have the required permissions to perform this command.", "#7289da"));
        }
    }

    if(input === "list"){
        let array = bot.when;
        let arrayCollection = [];
        function logMapElements(value, key, map) {
            arrayCollection.push(key)
        }
        array.forEach(logMapElements);
        var output = arrayCollection.join("`,`");
        return message.channel.send(ft.gaiaEmbed(`**Currently available Countdowns:**\n` + "`" + output + "`", "#7289da"));
    }

    if(input === "create"){
        if(!args[1]){
            let color = "#7289da";
            let text = "**Usage**:\n`$when create <name> <MM/DD/YYYY>`\n\n**Information**:\n```This will create a Countdown, once the Countdown has finished, it will be deleted automatically.```";
            return message.channel.send(ft.gaiaEmbed(text, color))
        } else if(!args[2]){
            let color = "#7289da";
            let text = "Please provide a time in the MM/DD/YYYY format.";
            return message.channel.send(ft.gaiaEmbed(text, color));
        } else {
            let key2 = args[1];
            if(bot.when.has(key2)){return message.channel.send(ft.gaiaEmbed(`There is already a Countdown with the name: ${key2}.`, "#7289da"))}
            let dateInput = args[2];

            let check = isDate(dateInput);
            var letters = /^[A-Za-z]+$/;

            if(args[2].match(letters)){return message.channel.send(ft.gaiaEmbed(`The name cannot contain spaces, please try again.`, "#7289da"))}

            if(check === true){
                let nameIs = args[1];
                let dateInput = args[2];
                let array = dateInput.split('/');
                let month = array[0] - 1;
                let date = new Date(array[2], month, array[1]).getTime() / 1000;
                let dateNow = Date.now() / 1000;
                if(date < dateNow){return message.channel.send(ft.gaiaEmbed(`This date has already passed, please supply a date in the future.`, "#7289da"))}
                if(args[1].length > 12){return message.channel.send(ft.gaiaEmbed(`Please provide a shorter name. (Count: ${args[1].length}/12)`, "#7289da"))}
                let key = nameIs; // Set the Key to be the Name of the Countdown

                bot.when.ensure(key, { // Ensures Values are Set
                    name: key,
                    time: date,
                  });

                message.channel.send(ft.gaiaEmbed(`Countdown succesfully created, check it out using: $when ${nameIs}`, "#7289da"));
                return 
            } else {
                return message.channel.send(ft.gaiaEmbed("That is not a valid Date, the format is: `MM/DD/YYYY`.", "#7289da"));
            }
        }
    }
// Get Countdown
    if(input){
        try {
            let array = bot.when;
            let arrayCollection = [];
            function logMapElements(value, key, map) {
                arrayCollection.push(key)
            }
            array.forEach(logMapElements);

            let match = sm.findBestMatch(input, arrayCollection);
            let countdown = match.bestMatch.target;

            let time = bot.when.get(countdown, "time");
            message.channel.send(ft.timeUntil(time, countdown));
        } catch(err) {
            message.channel.send(ft.gaiaEmbed("Couldn't find this countdown.", "#7289da"));
        }
        
    }
}

module.exports.help = {
    name: "when",
    aliases: ["when"],
    usage: "`$when`\n`$when list`\n`$when <countdown>`\n`$when create <name> <MM/DD/YYYY>`\n\n**Moderator Only:**\n`$when remove <countdown-name>`",
    description: "Get the time until a tag [GMT].",
    accessableBy: "Members"
  }
