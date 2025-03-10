module.exports = {
  name: 'play',
  inVc: true,
  sameVc: true,
  args: true,
  run: async (client, message, args) => {
    const player = client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      deaf:true
    });

    const res = await client.poru.resolve({query:args.join(" "),source:"youtube",requester:message.author});
    const { loadType, tracks, playlistInfo } = res;

    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of resolve.tracks) {
        track.info.requester = message.author;
        player.queue.add(track);
      }

      message.channel.send(
        `Added: \`${tracks.length} from ${playlistInfo.name}\``,
      );
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      const track = tracks.shift();
      track.info.requester = message.author;

      player.queue.add(track);
      message.channel.send(`Added: \`${track.info.title}\``);
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else {
      return message.channel.send('There are no results found.');
    }
  },
};
