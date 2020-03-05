const Discord = require("discord.js");
const Enmap = require("enmap");
myEnmap = new Enmap({name: "points"});

module.exports.run = async (bot, message,args) => {
    const user = message.mentions.users.first() || message.author;
    const memberMention = message.mentions.members.first() || message.member;

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    let userinfo = {};
    userinfo.createdat = user.createdAt;
    userinfo.discrim = user.discriminator;
    userinfo.id = user.id;
    userinfo.mfa = user.mfaEnabled;
    userinfo.pre = user.premium;
    userinfo.presen = user.presence;
    userinfo.tag = user.tag;
    userinfo.uname = user.username;
    userinfo.verified = user.verified;
    userinfo.avatar = user.displayAvatarURL;

    const rolesOfTheMember = memberMention.roles.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')

    var myInfo = new Discord.RichEmbed()
        .setAuthor(userinfo.uname, userinfo.avatar)
        .addField("Username",userinfo.uname, true)
        .addField("Discriminator", "#" + userinfo.discrim, true)
        .addField("Client ID",userinfo.id, true)
        .addField("Creation Date", `${user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.createdAt)})`, true)
        .addField("Roles", rolesOfTheMember)
        .setColor("#7289da")
        .setThumbnail(userinfo.avatar);

        message.channel.sendEmbed(myInfo);
        return
}

module.exports.help = {
    name: "userinfo",
    aliases: ["ui"],
    usage: "`$userinfo`",
    description: "Display useful information about the user.",
    accessableBy: "Members"
  }