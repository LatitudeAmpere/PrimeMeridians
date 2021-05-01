const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
    info: {
        name: "leave",
        aliases: ["goaway", "disconnect", "logoff"],
        description: "The Botler disconnects from voice chat.",
        usage: "Leave",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("You are not in a VC.", message.channel);
        if (!message.guild.me.voice.channel) return sendError("I'm not in a VC!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Good night.", message.channel);
        }

        const Embed = new MessageEmbed()
            .setAuthor("Leaving the voice channel")
            .setColor("GREEN")
            .setTitle("Left")
            .setDescription("Left the voice channel.")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("Left the VC."));
    },
};
