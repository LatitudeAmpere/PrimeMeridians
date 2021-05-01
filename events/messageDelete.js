const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
log = require("../logChannel.json");
module.exports = (client, message) => {
    
    const logs = message.guild.channels.cache.find(channel => channel.name === log[message.guild.id].channel);
    
    const embed = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL())
      .setAuthor(`${message.author.tag}'s message has been deleted`, message.author.displayAvatarURL({ dynamic: true }))
      .setColor("RED")
      .addField('Channel: ', "```" +  message.channel.name +"```",true)
      .addField('Message: ', "```" + message.content +"```",true)
      .setTimestamp()
    logs.send(embed);
      
}