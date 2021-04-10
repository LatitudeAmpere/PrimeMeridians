const { MessageEmbed } = require("discord.js")


module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("Oh my goodness!")
    await channel.send(embed)
}
