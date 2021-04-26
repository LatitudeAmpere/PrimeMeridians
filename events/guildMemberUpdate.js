const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
log = require("../logChannel.json");
module.exports = (client, oldMember, newMember) => {
    const logs = oldMember.guild.channels.cache.find(channel => channel.name === log[oldMember.guild.id].channel);
    
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        
        const embed = new Discord.MessageEmbed();
        embed.setColor("RED");
        embed.setAuthor(newMember.user.tag, newMember.user.avatarURL({ dynamic: true }));
        
        oldMember.roles.cache.forEach(role => {
            if (!newMember.roles.cache.has(role.id)) {
                embed.addField("Role Removed", role);
            }
        });

        logs.send(embed);
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        const embed = new Discord.MessageEmbed();
        embed.setColor("PURPLE");
        embed.setAuthor(newMember.user.tag, newMember.user.avatarURL({ dynamic: true }));
        
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                embed.addField("Role Added", role);
            }
        });
        logs.send(embed);
    }
      
}