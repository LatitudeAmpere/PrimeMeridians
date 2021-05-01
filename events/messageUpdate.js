const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
log = require("../logChannel.json");
module.exports = (client, oldMessage, newMessage) => {

    const logs = newMessage.guild.channels.cache.find(channel => channel.name === log[newMessage.guild.id].channel);
    
    if (oldMessage.content === newMessage.content) return;
      let embed = new Discord.MessageEmbed() 
        .setThumbnail(newMessage.guild.iconURL())
        .setAuthor(`${newMessage.author.tag} has edited thier message`, newMessage.author.displayAvatarURL({ dynamic: true }))
        .setColor("BLUE")
        .addField("Before", "```" + oldMessage.content +"```",true)
        .addField("After", "```" +  newMessage.content +"```",true)
        .setTimestamp()
      logs.send(embed);
      
}