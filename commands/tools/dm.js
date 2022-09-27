const {SlashCommandBuilder} = require('discord.js')
const members = require('../../członkowie.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('sends dm!')
        .addStringOption(option =>
            option.setName('target')
            .setDescription('The person to send message')
            .setRequired(true)
            .addChoices(
				{ name: 'Siewca', value: 'Siewca'},
				{ name: 'Cyklon', value: 'Cyklon'},
				{ name: 'Huragan', value: 'Huragan'},
                { name: 'Fen', value: 'Fen'},
                { name: 'Monsun', value: 'Monsun'},
                { name: 'Samum', value: 'Samum'},
                { name: 'Mistral', value: 'Mistral'},
                { name: 'Orkan', value: 'Orkan'},
                { name: 'Lewanter', value: 'Lewanter'},
                { name: 'Santana', value: 'Santana'}
			))
        .addStringOption(option =>
            option.setName('message').setDescription('Message content')
            .setRequired(true))
    ,
    async execute(interaction, client){
        if (Object.values(members).includes(interaction.user.id.toString())){
            const member = await interaction.options.getString('target')
            const message = await interaction.options.getString('message')
            const memberUser = await client.users.fetch(members[member])
            const senderId = await interaction.user.id
            const sender = await Object.keys(members).find(key => members[key]==senderId)
            let channel = client.channels.cache.get('1022936085925478430');
            const messageContent = `**${sender}**->**${member}**: ${message}`
            memberUser.send(messageContent);
            channel.send(messageContent);
            channel = client.channels.cache.get('1022934452734787714');
            channel.send(messageContent);
            interaction.reply({content: messageContent, ephemeral: true})
        }
        else{
            interaction.reply({ content: 'You are not worthy!', ephemeral: true })
        }
    }
}