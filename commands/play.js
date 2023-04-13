const { QueryType, useMasterPlayer, useQueue } = require('discord-player')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song of your choice!',
    voiceChannel: true,
    options: [
        {
            name: 'biisi',
            description: 'Mitä soitetaan?',
            type: 3,
            required: true
        }
    ],

    async execute(interaction) {

        try {    
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!');

            const player = useMasterPlayer();
            const queue = useQueue(interaction.guild.id);
            const query = interaction.options.getString('biisi', true);
            console.log(`biisi: **${query}**`)
            const result = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
                
            });
          
            if (!result.hasTracks()) { //Check if we found results for this query
                return interaction.reply({embeds: [embed]})
            }

            await interaction.deferReply()
            await interaction.editReply({ content: `Loading a: ${result.playlist ? 'playlist' : 'track' }`})
            
            if (!queue || !queue.node.isPlaying()) {
                await player.play(channel, result, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        bufferingTimeout: 5000,
                        leaveOnEnd: false,
                    }
                })

                const embed = new EmbedBuilder()
                embed
                .setTitle(`Biisi:`)
                .setColor(`#00ff08`)
                .setTimestamp()

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('pause/resume')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('2')
                    .setLabel('skip')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('3')
                    .setLabel('stop')
                    .setStyle(ButtonStyle.Danger)
                );
                await interaction.editReply({ ephemeral: true, embeds: [embed], components: [row]})
            } else {
                const index = queue.getSize();
                queue.addTrack(result.tracks[index])
                console.log("track added")
            }
        } catch (error) {
            console.log(error)
        }  
}};


/*const { QueryType, useMasterPlayer, useQueue } = require('discord-player')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play a song of your choice!',
    voiceChannel: true,
    options: [
        {
            name: 'biisi',
            description: 'Mitä soitetaan?',
            type: 3,
            required: true
        }
    ],

    async execute(interaction) {

        try {    
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!');

            const player = useMasterPlayer();
            const queue = useQueue(interaction.guild.id);
            const query = interaction.options.getString('biisi', true);
            console.log(`biisi: **${query}**`)
            const result = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
                
            });
          
            if (!result.hasTracks()) { //Check if we found results for this query
                return interaction.reply({embeds: [results]})
            }

            await interaction.deferReply()
            await interaction.editReply({ content: `Loading a: ${result.playlist ? 'playlist' : 'track' }`})
            
            if (!queue || !queue.node.isPlaying()) {
                await player.play(channel, result, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        bufferingTimeout: 5000,
                        leaveOnEnd: false,
                    }
                })

                const embed = new EmbedBuilder()
                embed
                .setTitle(`Biisi:`)
                .setColor(`#00ff08`)
                .setTimestamp()

                const row = new ActionRowBuilder()
                .addComponents(
                    /*
                    new ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('resume/pause')
                    .setStyle(ButtonStyle.Primary),
                    
                    new ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('resume')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('2')
                    .setLabel('resume/pause')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('3')
                    .setLabel('skip')
                    .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                    .setCustomId('4')
                    .setLabel('stop')
                    .setStyle(ButtonStyle.Danger)
                );
                await interaction.editReply({ ephemeral: true, embeds: [embed], components: [row]})
            } else {
                const index = queue.getSize();
                queue.addTrack(result.tracks[index])
                console.log("track added")
            }
        } catch (error) {
            console.log(error)
        }  
    }
};
*/

/*
//Code: Nothing play, Embed is visible only>
const { QueryType, useMasterPlayer, useQueue } = require('discord-player')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : 'play',
    description : 'Play a song of your choice!',
    voiceChannel : true,
    options : [
        {
            name : 'biisi',
            description: 'Mitä soitetaan?',
            type : 3,
            required : true
        }
    ],

    async execute(interaction) {
    
        try {
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!');

            const player = useMasterPlayer();
            const queue = useQueue(interaction.guild.id);
            const query = interaction.options.getString('biisi', true);
            console.log(`biisi: **${query}**`)
            const result = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.FILE,
            });

    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
	    .setTitle('Example embeds')
	    .setURL('https://discord.js.org/')
	    .setAuthor({ name: 'EMBEDS', iconURL: 'https://global-uploads.webflow.com/5e157548d6f7910beea4e2d6/62a07b53139aec4c1fd07771_discord-logo.png', url: 'https://discord.js.org' })
	    .setDescription('Here is an example embeds')
	    .setThumbnail('https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ')
	    .addFields(
		{ name: 'Title is embeds', value: 'example value of embeds' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field embed', value: 'embed value', inline: true },
		{ name: 'Inline field embeds', value: 'embeds value', inline: true },
	)
        .addFields({ name: 'Inline field test', value: 'test value', inline: true })
	    .setImage('https://t.ctcdn.com.br/EhYD-VVZZBfa4mR1KwoX_GxRVFA=/1280x720/smart/i615886.jpeg')
    	.setTimestamp()
	    .setFooter({ text: 'Hope it works', iconURL: 'https://www.dutchcowboys.nl/uploads/headers/discord-gamers.jpg' });

    
            if (!result.hasTracks()) { //Check if we found results for this query
                await interaction.reply({ embeds: [exampleEmbed]});
                return;
            }
            if (!queue || !queue.node.isPlaying()) {
                await interaction.reply({content: `Loading your track`, ephemeral: true});                
                await player.play(channel, result, {
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
            }
            else {
                const index = queue.getSize();
                queue.addTrack(result.tracks[index])
                //queue.addTrack(result.playlist ? result.tracks : result.tracks[0])
            } 
        } catch (error) {
                console.log(error)
            }
    }
};

//Code for only playing>
const { QueryType, useMasterPlayer, useQueue } = require('discord-player')

    module.exports = {
    name: 'play',
    description: 'Play a song of your choice!',
    voiceChannel: true,
    options: [
        {
            name: 'biisi',
            description: 'Mitä soitetaan?',
            type: 3,
            required: true
        }
    ],

    async execute(interaction) {

        try {
            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply('You are not connected to a voice channel!');

            const player = useMasterPlayer();
            const queue = useQueue(interaction.guild.id);
            const query = interaction.options.getString('biisi', true);
            console.log(`biisi: **${query}**`)
            const result = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if (!result.hasTracks()) { //Check if we found results for this query
                await interaction.reply(`We found no tracks for ${query}!`);
                return;
            }
            if (!queue || !queue.node.isPlaying()) {
                await interaction.reply({content: `Loading your track`, ephemeral: true});
                await player.play(channel, result, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        bufferingTimeout: 5000,
                        leaveOnEnd: false,
                    }
                })
            } else {
                const index = queue.getSize();
                queue.addTrack(result.tracks[index])
                await interaction.reply({content: `Lisätään soittolistalle.`, ephemeral: true});
            }
        } catch (error) {
            console.log(error)
        }
    }
};
*/
