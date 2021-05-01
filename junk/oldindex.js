require("dotenv").config(); // Loading .env
const fs = require("fs");
const fetch = require('node-fetch');
const { Collection, Client, MessageEmbed } = require("discord.js");
const { autoBanEnabled, warningCount } = require('./settings.json');

const client = new Client();
client.commands = new Collection();
client.queue = new Map();

client.config = {
    prefix: process.env.PREFIX,
    SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
}

// Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(__dirname + `/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log("Loading Event: "+eventName)
    });
});

// Loading Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log("Loading Command: "+commandName)
    });
});

client.login(process.env.TOKEN);

client.on('message', (message) => {
    if (message.content == '!cat') {
        var name = require.resolve('./settings.json');
        delete require.cache[name];
        var json = require('./settings.json');

        if (json.CatPicturesEnabled == "checked") {
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
    }

    //  this block loads JSON file each time a message is received

    var name = require.resolve('./badWords.json');
    delete require.cache[name];
    var list = require('./badWords.json');

    // end of block

    var badword = list.words;
    console.log(message.content);
    var str = message.content;
    console.log(str);
    var splitstring = str.split(" ");  
    console.log(splitstring.toString);
  
    for (i in splitstring) {
        console.log(splitstring);
        
        if (badword.includes(splitstring[i]) ) {
            message.delete();
            message.channel.send('Banned word detected; please refrain from using banned words in the future.');
        }
    }
});