const Discord  = require('discord.js')
const client = new Discord.Client();

/*client.on('message', message => {
    console.log(message.content);

    if (message.content === 'ping')  {
        
        message.channel.send('pong');
      }
});*/





client.on('message', message => {
  
    //  this block loads json file each time a message is recieved 
    var path = require('path');
  
    var filename = path.resolve('./badWords.json');
  
    delete require.cache[filename];
  
    var list = require('./badWords.json');
    // end of block
    var badword = list.words;
    
  
    // debug console.log(message.content);
    
    var str = message.content;
  
    //console.log(str);
  
    var splitstring = str.split(" ");  
  
    console.log(splitstring.toString);
  
    for (i in splitstring) {
  
        console.log(splitstring);
        
      if (badword.includes(splitstring[i]) ) {
        message.delete();
        message.channel.send('Banned word detected please refrain from using banned words in the future');
       
        
      }
    }
  });