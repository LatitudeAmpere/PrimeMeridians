const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();


module.exports = {
    info: {
        name: "trivia",
        aliases: ["jeopardy", "quiz"],
        description: "trivia with jeopardy questions",
        usage: "Trivia",
    },
}

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', msg => {
        if (msg.content === '!kimmi ping') {
            msg.reply('Kimmi Pong!');
        }
    });

    function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.login('ODEwNTYwMzE0MTAxNDY1MDg5.YClbHg.30yPzLl1r-gPSxZhl7Q5SHTmPwQ');

function readQuestions() {
    const fs = require('fs');
    const data = fs.readFileSync('JEOPARDY_QUESTIONS1.json', 'utf-8')
    const triviaDb = JSON.parse(data.toString());
    return triviaDb;
}

const triviaDb = readQuestions();

async function printQ(msg) {
    let qNum = Math.floor(Math.random() * triviaDb.length);
    msg.reply('Category: ' + triviaDb[qNum].category);
    msg.reply('Question: ' + triviaDb[qNum].question);
    msg.reply('For: ' + triviaDb[qNum].value);
    await sleep(30000);

    msg.reply('Answer: ' + triviaDb[qNum].answer);
}

client.on('message', msg => {
    if (msg.content === '!trivia') {
        printQ(msg);
    }
});


const prizePic = ['https://imgur.com/3hVu6Gl.jpg',
    'https://imgur.com/pFLdX7H.jpg',
    'https://imgur.com/DGWqhGY.jpg',
    'https://imgur.com/RMNVgTi.jpg',
    'https://imgur.com/WWkrYc7.jpg'];

client.on('message', message => {
    if (message.content === '!prize') {
        let pNum = Math.floor(Math.random() * prizePic.length);
        const attachment = new Discord.MessageAttachment(prizePic[pNum]);
        message.channel.send(attachment);
    }
});

client.on('message', msg => {
    if (msg.content === '!trivia info') {
        msg.reply(`Trivia Bot Info:
        !trivia for a random question. You will have 30 seconds to answer.
        Tally up points with your friends. The winner gets a prize by entering !prize.`);
    }
});
