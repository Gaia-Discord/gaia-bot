const Discord = require("discord.js");
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const fetch = require("node-fetch"); // This is to fetch the user avatar and convert it to a buffer.
Canvas.registerFont(resolve(join(__dirname, "discord.otf")), "Discord");
const Enmap = require("enmap");
const fsn = require("fs-nextra");
const imageUrlRegex = /\?size=2048$/g;

module.exports.run = async (bot, message,args,tools) => {
    const key = `${message.guild.id}-${message.author.id}`;
    
if(args[0] === "color"){ // Color Command
    const key = `${message.guild.id}-${message.author.id}`

    function isRGB(rgb) {
        var rgbPattern = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/;
        return rgbPattern.test(rgb);
    }

    function isHEX(hex) {
        var hexPattern = /^#(?:[A-Fa-f0-9]{3}){1,2}$/;
        return hexPattern.test(hex);
    }

    if(!args[1]){return message.channel.send("Please provide a **HEX** code.")}

    if(args[1] === "default"){
        bot.color.set(key, "#7289da", "color");
        message.channel.send("Color succesfully changed to the default color.")
        return
    }

      function RGBToHex(rgb) { // Check if input is a RGB Code
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        rgb = rgb.substr(4).split(")")[0].split(sep);
        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
        return "#" + r + g + b;
      }

    bot.color = new Enmap({name: "color"});
    const color = bot.color.get(key);
    const color2 = args[1].replace("#", "");
    const colorInput = isHEX(args[1]);
    
    const rgbInput = isRGB(args[1]);
    bot.color.ensure(key, {color:"#7289da"});

    var colorHex = "";

    if(colorInput == true){
        if(args[1].includes("#")){
            colorHex = args[1];
        } else{ colorHex = "#" + args[1];}

        bot.color.set(key, colorHex, "color");
        message.channel.send("Color succesfully changed.");
        return;
    } else {
        if(rgbInput == true){
            const colorRGB = RGBToHex(args[1]);
            bot.color.set(key, colorRGB, "color");
            message.channel.send("Color succesfully changed.");
            return
        } else {
        message.channel.send("That is not a valid **HEX** or **RGB** code");
        return;
        }
    }
}

if(args[0] === "description"){ // Description Handling
    const key = `${message.guild.id}-${message.author.id}`
    if(!args[1]){return message.channel.send("Please provide a **description**.")}
    bot.description = new Enmap({name: "description"});

    bot.description.ensure(key, {description: "No Description set."});

    let data = args.slice(1).join(" ");
    //let data = descriptionSet.substr(0, 52) + "\n" + descriptionSet.substr(53,98) + "\n" /*+ descriptionSet.substr(98,156) + "\n" + descriptionSet.substr(156,208) + "\n"*/;

    if(data.length > 300){return message.channel.send("Please provide a Description shorter than **300** characters.")}

    bot.description.set(key, data, "description");
    message.channel.send("Description set succesfully!");
    return
}

if(args[0] === "help"){
    let embed = new Discord.RichEmbed()
    .setAuthor(`Gaia`, bot.user.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setColor("#7289da")
    .addField("Profile", "`$profile [<mention | ID | username>]`")
    .addField("Description", "`$profile description <description>`")
    .addField("Color", "`$profile color <hex-code>`")
    .setFooter("Syntax: < > is required, [ ] is optional.");

    return message.channel.send(embed);
}

if(!args[0]){
    bot.description = new Enmap({name: "description"});
    bot.points = new Enmap({name: "points"});
    const result = await fetch(message.member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
    const avatar = await result.buffer();
    const name = message.member.displayName.length > 20 ? message.member.displayName.substring(0, 17) + "..." : message.member.displayName;
    const key = `${message.guild.id}-${message.author.id}`
    const { level, points } = bot.points.get(key);
    bot.color.ensure(key, {color:"#7289da"});
    bot.description.ensure(key, {description: "No Description set."});
    bot.reputationCount = new Enmap({name: "repCount"});
    bot.reputationCount.ensure(key, {repCount: 0});

    // Badges
    const E3 = await fsn.readFile('E3.png')
    const E32020 = await fsn.readFile('E32020.png')
    const Year1 = await fsn.readFile('year1.png')
    const GotD = await fsn.readFile('GotD.png')
    const mod = await fsn.readFile('Mod2.png')
    const empty = await fsn.readFile('empty.png')

    //Badges Checking

    function findRole(role){
        message.member.roles.find(r => r.name === role);
        return role;
    }

    if(message.member.roles.find(r => r.name ==="E3 2019") && message.member.roles.find(r => r.name ==="Games of the Decade") && message.member.roles.find(r => r.name ==="E3 2020") && message.member.roles.find(r => r.name ==="Year 1")){
        var image1 = E3;
        var image2 = GotD;
        var image3 = Year1;
        var image4 = E32020;
    } else if(message.member.roles.find(r => r.name ==="Games of the Decade") && message.member.roles.find(r => r.name ==="E3 2020") && message.member.roles.find(r => r.name ==="Year 1")){
        var image1 = GotD;
        var image2 = Year1;
        var image3 = E32020;
        var image4 = empty;
    } else if(message.member.roles.find(r => r.name ==="E3 2020") && message.member.roles.find(r => r.name ==="Year 1")){
        var image1 = Year1;
        var image2 = E32020;
        var image3 = empty;
        var image4 = empty;
    } else if(message.member.roles.find(r => r.name ==="Year 1")){
        var image1 = Year1;
        var image2 = empty;
        var image3 = empty;
        var image4 = empty;
    } else {
        var image1 = empty;
        var image2 = empty;
        var image3 = empty;
        var image4 = empty;
    }


    let noRole = "No Role";

    try{
    var role = message.member.colorRole.name || message.member.highestRole.name || noRole;
    } catch(err){var role = noRole}

    let roleUppercase = role.toUpperCase();
    let roleUpdated = roleUppercase.length > 20 ? roleUppercase.substring(0, 17) + "..." : roleUppercase;
    let colorRole = "#4f555c";//message.member.displayHexColor;

    /* Calculate information from the user */
		const previousLevel = Math.floor((level / 0.3) ** 2);
		const nextLevel = Math.floor(((level + 1) / 0.3) ** 2);
		const progressBar = Math.max(Math.round(((points - previousLevel) / (nextLevel - previousLevel)) * 128), 6);

        const ProfileCanvas = new Canvas(475, 300)
        .setColor(`${bot.color.get(key, "color")}`)
        .addRect(103, 0, 372, 300)
        .setColor("#2C2F33")
        .addRect(0, 0, 103, 300)
        .addRect(244, 26, 231, 46)
        .addRect(299, 80, 176, 46)
        .setShadowColor("rgba(22, 22, 22, 1)") 
        .setShadowOffsetY(5) 
        .setShadowBlur(10) 
        .addCircle(100, 85, 62)
        .addCircularImage(avatar, 100, 82, 64)
        .save()
        .createBeveledClip(35, 133, 128, 32, 5)
        .setColor("#23272A")
        .fill()
        .restore()
        .setTextAlign("center")
        .setTextFont("12pt Discord")
        .setColor("#FFFFFF")
        .addText(name, 360, 56)
        .addText(`Level: ${bot.points.get(key, "level")}`, 100, 154)
        .setTextAlign("left")
        .addText(`XP: ${bot.points.get(key, "points")} / ${nextLevel}`, 316, 110)

        .setColor(`#42474d`)
        .addBeveledRect(35, 161, 128, 4, 3)

        // Progress bar
			.setColor(`#64c166`)
            .addBeveledRect(35, 161, progressBar, 4, 3)

        // Role Bar
            .setColor(colorRole)
            .resetShadows()
            .addRect(299, 133, 176, 20)

            .setColor("#FFFFFF")
            .setTextAlign("center")
            .setTextFont("9pt Discord")
            .addText(roleUpdated, 389, 148, 176)

        // Badges and Description
            .setColor("#3e4247")
            .addBeveledRect(8, 190, 87, 96, 10)
            .setColor("#c7c7c8")
            .addText("BADGES", 50, 187)
            .setColor("#FFFFFF")
            .addBeveledRect(113, 190, 353, 96, 10)
            .setColor("#2b2e32")
            .addBeveledRect(115, 176, 88, 14, 3)
            .setColor("#FFFFFF")
            .addText("DESCRIPTION", 159, 187)
            .setTextFont("11pt Discord")
            .setTextAlign("left")
            .setColor("#727272")
            .addWrappedText(`${bot.description.get(key, "description")}`, 120, 207, 340)

            // Badges
            .addImage(image1, 25, 198)
            .addImage(image2, 58, 198)
            .addImage(image3, 25, 225)
            .addImage(image4, 58, 225)

            // Reputation
            .setColor("#2c2f33")
            .addRect(244, 80, 47, 46)

            .setTextFont("14pt Discord")
            .setTextAlign("center")
            .setColor("#FFFFFF")
            .addText(`${bot.reputationCount.get(key, "repCount")}`, 268, 105)

            .setTextFont("10pt Discord")
            .setTextAlign("left")
            .setColor("#c7c7c8")
            .addText("REP", 257, 121)
            
        
        .toBuffer();
        

    const attachment = new Discord.Attachment(ProfileCanvas, 'profile.png');

    message.channel.send(attachment);
} else {
    bot.points = new Enmap({name: "points"});
    bot.description = new Enmap({name: "description"});
    
    
    //console.log(bot.users.find("username", args[0]));

    let member2 = message.mentions.members.first() || tools.autocomplete(message, args.join(' ')) /*bot.users.find("username", args[0])*/;

    let member = message.guild.members.get(member2.id);

    //const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    //console.log(message.guild.members.get(args[0]));
    const memberID = member.id;
    const key = `${message.guild.id}-${memberID}`

    bot.description.ensure(key, {description: "No Description set."});
    bot.points.ensure(key, {level:"1"});
    bot.points.ensure(key, {points:"0"});

    bot.reputationCount = new Enmap({name: "repCount"});
    bot.reputationCount.ensure(key, {repCount: 0});
    
    const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
    const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
    const avatar = await result.buffer();
    
    const { level, points } = bot.points.get(key);
    bot.color.ensure(key, {color:"#7289da"});

    // Badges
    const E3 = await fsn.readFile('E3.png')
    const GotD = await fsn.readFile('GotD.png')
    const mod = await fsn.readFile('Mod2.png')
    const empty = await fsn.readFile('empty.png')

    //Badges Checking
    if(member.roles.find(r => r.name === "E3 2019")){
        var image1 = E3;
        if(member.roles.find(r => r.name === "Games of the Decade")){
            var image2 = GotD;
            if(member.roles.find(r => r.name === "Gaia Permissions")){
                var image3 = mod;
            } else {var image3 = empty;}
        } else {
            if(member.roles.find(r => r.name === "Gaia Permissions")){
                var image2 = mod;
            } else {var image2 = empty; var image3 = empty;}
            
        }
    } else if(member.roles.find(r => r.name === "Games of the Decade")){
        if(member.roles.find(r => r.name === "Gaia Permissions")){
            var image1 = GotD; var image2 = mod; var image3 = empty;
        } else { var image1 = GotD; var image2 = empty; }
        
    } else if (member.roles.find(r => r.name === "Gaia Permissions")){
        var image1 = mod;
        var image2 = empty;
        var image3 = empty;
    }

    let noRole = "No Role";

    try{
    var role = member.colorRole.name || member.highestRole.name || noRole;
    } catch(err){var role = noRole}

    let roleUppercase = role.toUpperCase();
    let roleUpdated = roleUppercase.length > 20 ? roleUppercase.substring(0, 17) + "..." : roleUppercase;
    let colorRole = "#4f555c";//member.displayHexColor;

    bot.color.ensure(key, {color:"#7289da"});

    /* Calculate information from the user */
		const previousLevel = Math.floor((level / 0.3) ** 2);
		const nextLevel = Math.floor(((level + 1) / 0.3) ** 2);
		const progressBar = Math.max(Math.round(((points - previousLevel) / (nextLevel - previousLevel)) * 128), 6);

    const ProfileCanvas = new Canvas(475, 300)
    .setColor(`${bot.color.get(key, "color")}`)
        .addRect(103, 0, 372, 300)
        .setColor("#2C2F33")
        .addRect(0, 0, 103, 300)
        .addRect(244, 26, 231, 46)
        .addRect(299, 80, 176, 46)
        .setShadowColor("rgba(22, 22, 22, 1)") 
        .setShadowOffsetY(5) 
        .setShadowBlur(10) 
        .addCircle(100, 85, 62)
        .addCircularImage(avatar, 100, 82, 64)
        .save()
        .createBeveledClip(35, 133, 128, 32, 5)
        .setColor("#23272A")
        .fill()
        .restore()
        .setTextAlign("center")
        .setTextFont("12pt Discord")
        .setColor("#FFFFFF")
        .addText(name, 360, 56)
        .addText(`Level: ${bot.points.get(key, "level")}`, 100, 154)
        .setTextAlign("left")
        .addText(`XP: ${bot.points.get(key, "points")} / ${nextLevel}`, 316, 110)

        .setColor(`#42474d`)
        .addBeveledRect(35, 161, 128, 4, 3)

        // Progress bar
			.setColor(`#64c166`)
            .addBeveledRect(35, 161, progressBar, 4, 3)

        // Role Bar
            .setColor(colorRole)
            .resetShadows()
            .addRect(299, 133, 176, 20)

            .setColor("#FFFFFF")
            .setTextAlign("center")
            .setTextFont("9pt Discord")
            .addText(roleUpdated, 389, 148, 176)

        // Badges and Description
        .setColor("#3e4247")
        .addBeveledRect(8, 190, 87, 96, 10)
        .setColor("#c7c7c8")
        .addText("BADGES", 50, 187)
        .setColor("#FFFFFF")
        .addBeveledRect(113, 190, 353, 96, 10)
        .setColor("#2b2e32")
        .addBeveledRect(115, 176, 88, 14, 3)
        .setColor("#FFFFFF")
        .addText("DESCRIPTION", 159, 187)
        .setTextFont("11pt Discord")
        .setTextAlign("left")
        .setColor("#727272")
        .addWrappedText(`${bot.description.get(key, "description")}`, 120, 207, 340)

        // Badges
        .addImage(image1, 25, 198)
        .addImage(image2, 58, 198)
        .addImage(image3, 25, 220)

        // Reputation
        .setColor("#2c2f33")
        .addRect(244, 80, 47, 46)

        .setTextFont("14pt Discord")
        .setTextAlign("center")
        .setColor("#FFFFFF")
        .addText(`${bot.reputationCount.get(key, "repCount")}`, 268, 105)

        .setTextFont("10pt Discord")
        .setTextAlign("left")
        .setColor("#c7c7c8")
        .addText("REP", 257, 121)
        
    
    .toBuffer();

    const attachment = new Discord.Attachment(ProfileCanvas, 'profile.png');

    message.channel.send(attachment);


} 
}

module.exports.help = {
    name: "profile",
    aliases: ["p"],
    usage: "`$profile [<mention | id | username>]` - **Display users Profile**\n`$profile color <hex-code>` - **Set Profile Color**\n`$profile color default` - **Set Profile Color to default Color**\n`$profile description <description>` - **Set Profile Description**",
    description: "Display your (or another users) profile.",
    accessableBy: "Members"
}