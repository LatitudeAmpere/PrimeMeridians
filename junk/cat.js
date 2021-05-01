//const { prefix } = require('../config.json');
const { prefix } = "!";
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    info: {
        name: "cat",
        aliases: ["catpic", "catplease", "givecat", "cat", "kitten"],
        description: "displays random cat pic",
        usage: "[cat]"
    },

	name: 'message',

	execute(message) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        /* if (message.content.startsWith(`${prefix}ping`)) {
            message.channel.send('Pong.');
        }
        else if (message.content.startsWith(`${prefix}beep`)) {
            message.channel.send('Boop.');
        }
        else if (message.content === `${prefix}server`) {
            message.channel.send(`Server name: ${message.guild.name}\n
                Total members: ${message.guild.memberCount}\n
                Server Creation Date: ${message.guild.createdAt}\n
                Server Region: ${message.guild.region}`);
        }
        else if (message.content === `${prefix}user-info`) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        }
        else if (command === 'args-info') {
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }
            else if (args[0] === 'foo') {
                return message.channel.send('bar');
            }
        
            message.channel.send(`Command name: ${command}\nArguments: ${args}`);
        } */
        if (command === 'cat') {
            fetch('https://api.thecatapi.com/v1/images/search?')
            .then(res => res.json())
            .then(cats => {
                cats.forEach(cat => {
                    let embed = new MessageEmbed()
                    .setAuthor("Botler Cat")
                    .setColor("ORANGE")
                    .setDescription("Here is the cat you wanted!")
                    .setImage(`${cat.url}`)
                    .setFooter(`Jolly good!`)

                    message.channel.send(embed);
                });
            })
        }
	},
};
