const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "shows all commands",
        usage: "[command]",
        aliases: ["commands", "help me"]
    },

    run: async function(client, message, args) {
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Botler Commands "+client.user.username,)
        .setColor("BLUE")
        .setDescription(allcmds)
        .setFooter(`Need more information on a command? Type ${client.config.prefix}help [command]`)
        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("unknown command")
            let commandinfo = new MessageEmbed()
            .setTitle("command: "+command.info.name+" info")
            .setColor("YELLOW")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Aliases: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}
