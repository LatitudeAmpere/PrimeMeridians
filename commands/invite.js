const { MessageEmbed } = require("discord.js");

module.exports = {
  info: {
    name: "invite",
    description: "Invites the Botler to come work at your server",
    usage: "[invite]",
    aliases: ["inv"],
  },

  run: async function (client, message, args) {
    
    var permissions = 37080128;
    
    let invite = new MessageEmbed()
    .setTitle(`Invite ${client.user.username}`)
    .setDescription(`Hire me to work at your discord server!  \n\n [Invite Link](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot)`)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setColor("BLUE")
    return message.channel.send(invite);
  },
};
