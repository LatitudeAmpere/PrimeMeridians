const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
log = require("../logChannel.json");
module.exports = (client, member) =>{

    const logs = member.guild.channels.cache.find(channel => channel.name === log[member.guild.id].channel);
    
    const embed = new Discord.MessageEmbed()
      .setTitle('A user has left the server')
      .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member} (**${member.user.tag}**)`)
      .setTimestamp()
      .setColor("RED");
    logs.send(embed);
}