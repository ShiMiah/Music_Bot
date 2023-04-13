const {useQueue, useHistory} = require ('discord-player');

module.exports = {
    name: 'previous',
    description: 'skip the currently playing song and play the previous song',
    voiceChannel: true,

    async execute(interaction) {
        try {
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!');

            const queue = useQueue(interaction.guild.id);
            //const player = useMasterPlayer();
            const history = useHistory(interaction.guild.id);


            if (!queue ) {
                return interaction.reply('There is no previous song');
            }

            //const previousTrack = queue.previousTracks; // get the previous track and remove it from the history

            const lastSong = queue.history.previousTrack;

            await history.previous();
            interaction.reply({ content: `Edellinen kappale oli:, [${lastSong.title}] `});
            
            //await queue.add(previousTrack); // add the previous track to the beginning of the queue
/*
            await player.play(channel, lastSong, {
                nodeOptions: {
                    metadata: {
                        channel: interaction.channel,
                        client: interaction.guild?.members.me,
                        requestedBy: interaction.user.username
                    },
                    bufferingTimeout: 5000,
                    leaveOnEnd: false,
                }
            });
            
            queue.addTrack(lastSong.tracks[0]);
            queue.node.play(); // start playing the previous track
            interaction.reply('Playing the previous song');*/
        } 
        catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to play the previous song');
        }
    }
};

//https://youtube.com/playlist?list=PLliiMqsVIF-OPMfR4mlwvdVLMp9ko0QKY