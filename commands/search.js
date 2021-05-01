const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("discord-ytdl-core");
const YouTube = require("youtube-sr");
const sendError = require("../util/error");
const fs = require("fs");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    info: {
        name: "search",
        description: "Searches for a song to be played.",
        usage: "<song_name>",
        aliases: ["sc"],
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("I need to be in a voice channel!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Check my connection permissions.", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Check my speaking permissions.", message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError("I need a song to search for!", message.channel);

        var serverQueue = message.client.queue.get(message.guild.id);
        try {
            var searched = await YouTube.search(searchString, { limit: 10 });
            if (searched[0] == undefined) return sendError("I can't find your song.", message.channel);
            let index = 0;
            let embedPlay = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(`Results for \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                .setDescription(`${searched.map((video2) => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                .setFooter("Pick one of these songs to add to your queue.");
            
            message.channel.send(embedPlay).then((m) =>
                m.delete({
                    timeout: 15000,
                })
            );
            try {
                var response = await message.channel.awaitMessages((message2) => message2.content > 0 && message2.content < 11, {
                    max: 1,
                    time: 20000,
                    errors: ["time"],
                });
            } catch (err) {
                console.error(err);
                return message.channel.send({
                    embed: {
                        color: "RED",
                        description: "Goodbye.",
                    },
                });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await searched[videoIndex - 1];
        } catch (err) {
            console.error(err);
            return message.channel.send({
                embed: {
                    color: "RED",
                    description: "I did not find anything for your query. Try asking a different way!",
                },
            });
        }

        response.delete();
        var songInfo = video;

        const song = {
            id: songInfo.id,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(10, " "),
            ago: songInfo.uploadedAt,
            duration: songInfo.durationFormatted,
            url: `https://www.youtube.com/watch?v=${songInfo.id}`,
            img: songInfo.thumbnail.url,
            req: message.author,
        };

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
                .setAuthor("I have added your song to the queue.")
                .setThumbnail(song.img)
                .setColor("YELLOW")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views ${song.views} | ${song.ago}`);
            return message.channel.send(thing);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 80,
            playing: true,
            loop: false,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                sendError(
                    "Goodbye.",
                    message.channel
                );
                message.guild.me.voice.channel.leave(); // remove this to trap the Botler in VC FOREVER
                message.client.queue.delete(message.guild.id);
                return;
            }
            let stream;
            let streamType;

            try {
                if (song.url.includes("soundcloud.com")) {
                    try {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, client.config.SOUNDCLOUD);
                    } catch (error) {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, client.config.SOUNDCLOUD);
                        streamType = "unknown";
                    }
                } else if (song.url.includes("youtube.com")) {
                    stream = await ytdlDiscord(song.url, { filter: "audioonly", quality: "highestaudio", highWaterMark: 1 << 25, opusEncoded: true });
                    streamType = "opus";
                    stream.on("error", function (er) {
                        if (er) {
                            if (queue) {
                                queue.songs.shift();
                                play(queue.songs[0]);
                                return sendError(`An error has occurred. \nIt might be: \`${er}\``, message.channel);
                            }
                        }
                    });
                }
            } catch (error) {
                if (queue) {
                    queue.songs.shift();
                    play(queue.songs[0]);
                }

                console.error(error);
                return message.channel.send("err");
            }

            queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = queue.connection.play(stream, { type: streamType }).on("finish", () => {
                const shiffed = queue.songs.shift();
                if (queue.loop === true) {
                    queue.songs.push(shiffed);
                }
                play(queue.songs[0]);
            });

            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            let thing = new MessageEmbed()
                .setAuthor("Now playing")
                .setThumbnail(song.img)
                .setColor("BLUE")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views ${song.views} | ${song.ago}`);
            queue.textChannel.send(thing);
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            channel.guild.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Error squirrel pull message ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`Error squirrel pull message ${error}`, message.channel);
        }
    },
};
