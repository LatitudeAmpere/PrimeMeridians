const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("discord-ytdl-core");
var ytpl = require("ytpl");
const sendError = require("../util/error");
const fs = require("fs");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    info: {
        name: "playlist",
        description: "Plays a YouTube playlist!",
        usage: "<YouTube Playlist URL | Playlist Name>",
        aliases: ["pl"],
    },

    run: async function (client, message, args) {
        const channel = message.member.voice.channel;
        if (!channel) return sendError("You need to be in a VC to play music.", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var searchString = args.join(" ");
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Check my permissions sir", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Check my permissions sir", message.channel);

        if (!searchString || !url) return sendError(`Usage: ${message.client.config.prefix}playlist <YouTube Playlist URL | Playlist Name>`, message.channel);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
                const playlist = await ytpl(url.split("list=")[1]);
                if (!playlist) return sendError("I did not find the playlist.", message.channel);
                const videos = await playlist.items;
                for (const video of videos) {
                    await handleVideo(video, message, channel, true); 
                }
                return message.channel.send({
                    embed: {
                        color: "GREEN",
                        description: `**|**  Playlist: **\`${videos[0].title}\`** has been added to the queue`,
                    },
                });
            } catch (error) {
                console.error(error);
                return sendError("I did not find the playlist.", message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);

                if (searched.playlists.length === 0) return sendError("I cannot find this playlist on YouTube.", message.channel);
                var songInfo = searched.playlists[0];
                let listurl = songInfo.listId;
                const playlist = await ytpl(listurl);
                const videos = await playlist.items;
                for (const video of videos) {
           
                    await handleVideo(video, message, channel, true); 
                }
                let thing = new MessageEmbed()
                    .setAuthor("Here is your playlist.")
                    .setThumbnail(songInfo.thumbnail)
                    .setColor("GREEN")
                    .setDescription(`**|**  Playlist: **\`${songInfo.title}\`** has been added \`${songInfo.videoCount}\` to the queue`);
                return message.channel.send(thing);
            } catch (error) {
                return sendError("I am not shaving off my mustache!", message.channel).catch(console.error);
            }
        }

        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = message.client.queue.get(message.guild.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                views: video.views ? video.views : "-",
                ago: video.ago ? video.ago : "-",
                duration: video.duration,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                img: video.thumbnail,
                req: message.author,
            };
            if (!serverQueue) {
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

                try {
                    var connection = await channel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I cannot join VC. ${error}`);
                    message.client.queue.delete(message.guild.id);
                    return sendError(`I cannot join VC. ${error}`, message.channel);
                }
            } else {
                serverQueue.songs.push(song);
                if (playlist) return;
                let thing = new MessageEmbed()
                    .setAuthor("Added!")
                    .setThumbnail(song.img)
                    .setColor("YELLOW")
                    .addField("Name", song.title, true)
                    .addField("Duration", song.duration, true)
                    .addField("Requested by", song.req.tag, true)
                    .setFooter(`Views: ${song.views} | ${song.ago}`);
                return message.channel.send(thing);
            }
            return;
        }

        async function play(guild, song) {
            const serverQueue = message.client.queue.get(message.guild.id);
            if (!song) {
                sendError(
                    "The queue is finished. Good night.",
                    message.channel
                );
                message.guild.me.voice.channel.leave(); // comment this out to leave the Botler in VC FOREVER
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
                            if (serverQueue) {
                                serverQueue.songs.shift();
                                play(serverQueue.songs[0]);
                                return sendError(`An error has occurred. \nIt might be: \`${er}\``, message.channel);
                            }
                        }
                    });
                }
            } catch (error) {
                if (serverQueue) {
                    console.log(error);
                    serverQueue.songs.shift();
                    play(serverQueue.songs[0]);
                }
            }
            serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = serverQueue.connection.play(stream, { type: streamType }).on("finish", () => {
                const shiffed = serverQueue.songs.shift();
                if (serverQueue.loop === true) {
                    serverQueue.songs.push(shiffed);
                }
                play(guild, serverQueue.songs[0]);
            });

            dispatcher.setVolume(serverQueue.volume / 100);
            let thing = new MessageEmbed()
                .setAuthor("Music")
                .setThumbnail(song.img)
                .setColor("BLUE")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views ${song.views} | ${song.ago}`);
            serverQueue.textChannel.send(thing);
        }
    },
};
