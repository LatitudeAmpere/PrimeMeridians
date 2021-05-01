const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "loop",
    description: "Toggle for music looping",
    usage: "loop",
    aliases: ["l"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        };
    return sendError("nothing playing.", message.channel);
  },
};
