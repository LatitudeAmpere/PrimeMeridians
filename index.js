require("dotenv").config(); // Loading .env
const fs = require("fs");
const fetch = require('node-fetch');
const { Collection, Client, MessageEmbed } = require("discord.js");
const { autoBanEnabled, warningCount } = require('./settings.json');

const client = new Client();
client.commands = new Collection();
client.queue = new Map();
client.logChannel = require("./logChannel.json");
client.autorole = require("./autorole.json");

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

client.on('message', async (message) => {
    var name = require.resolve('./settings.json');
    delete require.cache[name];
    var json = require('./settings.json');
    if (message.content == '!cat') {
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

//invite musicsheen

  if (message.content == '!invite') {
    let embed = new MessageEmbed()
      .setAuthor("The Botler")
      .setColor("BLUE")
      .setDescription("Invite my assistant, Musicsheen!\n\nhttps://discord.com/api/oauth2/authorize?client_id=810664080880697365&permissions=0&redirect_uri=http%3A%2F%2F66.42.93.54%2Fbotler%2FFiles%2Ftest.html&scope=bot")
      .setFooter('Jolly good!')
    message.channel.send(embed);
  }

    //  this block loads JSON file each time a message is received

    var name = require.resolve('./badWords.json');
    delete require.cache[name];
    var list = require('./badWords.json');

    // end of block
    var usernames = require.resolve('./users.json');
    delete require.cache[usernames];
    var userlist = require('./users.json');

    

    var badword = list.words;
    console.log(message.content);
    var str = message.content;
    console.log(str);
    var splitstring = str.split(" ");  
    console.log(splitstring.toString);
  
    for (i in splitstring) {
        console.log(splitstring);
        
        if (badword.includes(splitstring[i]) ) {
            console.log(message.author.id);
            const member = message.guild.member(message.author);
            var id = message.author.id;

            message.delete();
            if(userlist.hasOwnProperty(id))
            {
                userlist[id] +=1;
                console.log(message.author.id);
            }else userlist[id] = 1;
            
            if(json.autoBanEnabled == "checked")
            {
                if(parseInt(userlist[id]) >= parseInt(json.warningCount)){
                    if(member.kickable){ 
                        member.kick('auto kick enabled').catch(err => {message.channel.send('unable to kick')});
                         message.channel.send('User has been kicked for using banned words');
                         
                    }}else
                    message.channel.send('user Id is greater than json warning count but not kickable');
                  
                }else{
			console.log(parseInt(json.warningCount));
                    message.channel.send('user ID is less than warning count or not properly counting');
                    
                }
                const jsonString = JSON.stringify(userlist);
                fs.writeFile('./users.json', jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file')
                    }
                })
                break;  
        }  
    }

    if (message.content.startsWith ('!reactionroles')) {
        const channel = '837258188285280267';
        const role1 = message.guild.roles.cache.find(role => role.name === "Music Lover");
        const role2 = message.guild.roles.cache.find(role => role.name === "Trivia Enthusiast");
        const role3 = message.guild.roles.cache.find(role => role.name === "Cat Lover");
    
        
        const emoji1 = '🎵';
        const emoji2 = '📚';
        const emoji3 = '😻';
        let embed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle('Choose your role')
            .setDescription('You can add or remove roles by reacting with emojis\n\n'
                + `${emoji1} for Music Lover\n`
                + `${emoji2} for Trivia Enthusiast\n`
                + `${emoji3} for Cat Lover`);
    
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(emoji1);
        messageEmbed.react(emoji2);
        messageEmbed.react(emoji3);
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
    
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role1);
                }
                if (reaction.emoji.name === emoji2) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role2);
                }
                if (reaction.emoji.name === emoji3) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(role3);
                }
            } else {
                return;
            }
    
        });
    
        client.on('messageReactionRemove', async (reaction, user) => {
    
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
    
    
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === emoji1) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role1);
                }
                if (reaction.emoji.name === emoji2) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role2);
                }
                if (reaction.emoji.name === emoji3) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(role3);
                }
            } else {
                return;
            }
        });
    }
    
    if (message.content.startsWith ('!setlogs')){
        if (!message.member.hasPermission("ADMINISTRATOR")){
          message.channel.send('You must be an admin to use this command')
          return;
        }
        args = message.content.slice (9);
        let channel = message.guild.channels.cache.find(x => x.name === args);
        if (!channel){
          message.channel.send('Invalid Channel');
        }
        else{
          client.logChannel [message.guild.id] = {
            channel: args
          }
      
         fs.writeFile ("./logChannel.json", JSON.stringify(client.logChannel, null, 4), err => {
          const logs = message.guild.channels.cache.find(channel => channel.name === client.logChannel[message.guild.id].channel);
          const embed = new MessageEmbed()
           .setTitle('Audit log channel has been updated')
           .setThumbnail(message.guild.iconURL({ dynamic: true }))
           .setColor('GREEN')
           .setDescription('**'+'The channel is now '+args+'**')
           .setTimestamp()
           logs.send(embed);
         });
       }
    }
        
    if (message.content.startsWith ('!setar')){
          if (!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send('You must be an admin to use this command')
            return;
          } 
          args = message.content.slice (7);
          let role = message.guild.roles.cache.find(x => x.name == args);
          if (!role){
            message.channel.send('Invalid Role');
          }
          else{
            client.autorole [message.guild.id] = {
              autorole: args
            }
        
            fs.writeFile ("./autorole.json", JSON.stringify(client.autorole, null, 4), err => {
              try {
                const logs = message.guild.channels.cache.find(channel => channel.name === client.logChannel[message.guild.id].channel);
                const embed = new MessageEmbed()
                 .setTitle('Autorole has been successsfully updated')
                 .setThumbnail(message.guild.iconURL({ dynamic: true }))
                 .setColor('GREEN')
                 .setDescription(''+'The autorole is now '+args+'')
                 .setTimestamp()
                 logs.send(embed);
              }
              catch {
                  message.channel.send('Audit-Log channel must be set first')
              }
            });
          }
    }    
});