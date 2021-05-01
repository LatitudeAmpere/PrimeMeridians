const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("discord-ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const sendError = require("../util/error");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    info: {
        name: "play",
        description: "Requests a song to be played.",
        usage: "<YouTube_URL> | <song_name>",
        aliases: ["p"],
    },

    run: async function (client, message, args) {
	var name = require.resolve('./settings.json');
        delete require.cache[name];
        var json = require('./settings.json');

        if (json.MusicStreamingEnabled == "checked") {
            let channel = message.member.voice.channel;
            if (!channel) return sendError("I need to be in a VC!", message.channel);

            const permissions = channel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT")) return sendError("Permissions error", message.channel);
            if (!permissions.has("SPEAK")) return sendError("Permissions error", message.channel);

            var searchString = args.join(" ");
            if (!searchString) return sendError("What do you want me to play?", message.channel);
            const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
            var serverQueue = message.client.queue.get(message.guild.id);

            let songInfo;
            let song;
            if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
                try {
                    songInfo = await ytdl.getInfo(url);
                    if (!songInfo) return sendError("I can't find this song on YouTube.", message.channel);
                    song = {
                        id: songInfo.videoDetails.videoId,
                        title: songInfo.videoDetails.title,
                        url: songInfo.videoDetails.video_url,
                        img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                        duration: songInfo.videoDetails.lengthSeconds,
                        ago: songInfo.videoDetails.publishDate,
                        views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                        req: message.author,
                    };
                } catch (error) {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
            } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
                try {
                    songInfo = await scdl.getInfo(url);
                    if (!songInfo) return sendError("I can't find this song on Soundcloud.", message.channel);
                    song = {
                        id: songInfo.permalink,
                        title: songInfo.title,
                        url: songInfo.permalink_url,
                        img: songInfo.artwork_url,
                        ago: songInfo.last_modified,
                        views: String(songInfo.playback_count).padStart(10, " "),
                        duration: Math.ceil(songInfo.duration / 1000),
                        req: message.author,
                    };
                } catch (error) {
                    console.error(error);
                    return sendError(error.message, message.channel).catch(console.error);
                }
            } else {
                try {
                    var searched = await yts.search(searchString);
                    if (searched.videos.length === 0) return sendError("I can't find this song on YouTube.", message.channel);

                    songInfo = searched.videos[0];
                    song = {
                        id: songInfo.videoId,
                        title: Util.escapeMarkdown(songInfo.title),
                        views: String(songInfo.views).padStart(10, " "),
                        url: songInfo.url,
                        ago: songInfo.ago,
                        duration: songInfo.duration.toString(),
                        img: songInfo.image,
                        req: message.author,
                    };
                } catch (error) {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
            }

            if (serverQueue) {
                serverQueue.songs.push(song);
                let thing = new MessageEmbed()
                    .setAuthor("Song has been added to queue")
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
                        "Leaving the voice channel because there are no songs in the queue.",
                        message.channel
                    );
                    message.guild.me.voice.channel.leave(); 
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
                                    return sendError(`I've encountered an error! It might be because of this: \`${er}\``, message.channel);
                                }
                            }
                        });
                    }
                } catch (error) {
                    if (queue) {
                        queue.songs.shift();
                        play(queue.songs[0]);
                    }
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
                    .setAuthor("Music!")
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
                play(queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I can't join the VC. ${error}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return sendError(`I can't join the VC. ${error}`, message.channel);
            }
        }
    },
};