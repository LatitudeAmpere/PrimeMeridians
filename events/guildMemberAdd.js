const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
log = require("../logChannel.json");
auto = require("../autorole.json");
module.exports = async (client, member) => {

    let ar = member.guild.roles.cache.find(role => role.name === auto[member.guild.id].autorole);
    member.roles.add(ar);

    const logs = member.guild.channels.cache.find(channel => channel.name === log[member.guild.id].channel);

    const embed = new Discord.MessageEmbed()
      .setTitle('A user has joined the server')
      .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member} (**${member.user.tag}**)`)
      .setTimestamp()
      .setColor("BLUE");
    logs.send(embed);
}