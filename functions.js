const sm = require('string-similarity');

module.exports = {
    autocomplete: function(message, string){
        let members = [];
        let indexes = [];

        message.guild.members.forEach(function(member){
            members.push(member.user.username);
            indexes.push(member.id);
        });

        let match = sm.findBestMatch(string, members);
        let username = match.bestMatch.target;
        let member = message.guild.members.get(indexes[members.indexOf(username)]);

        return member;
    }
};