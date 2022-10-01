const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js')
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
                { name: 'Santana', value: 'Santana'},
                { name: 'Pan Developer', value: 'Pan Developer'}
			))
        .addStringOption(option =>
            option.setName('message').setDescription('Message content')
            .setRequired(false))
        .addAttachmentOption(option =>
            option.setName('attachment').setDescription('file or image')
            .setRequired(false))
    ,
    async execute(interaction, client){
        if (Object.values(members).includes(interaction.user.id.toString())){
            const member = await interaction.options.getString('target')
            const message = await interaction.options.getString('message')
            const attachment = await interaction.options.getAttachment('attachment')

            const file = attachment?await new AttachmentBuilder(attachment.url):null

            const memberUser = await client.users.fetch(members[member])
            const senderId = await interaction.user.id
            const sender = await Object.keys(members).find(key => members[key]==senderId)
            let channel = client.channels.cache.get('1022936085925478430');
            const messageContent = `**${sender}**->**${member}**: ${message?message:''}`
            if(attachment){
                memberUser.send({content: messageContent, files: [file]});
                interaction.user.send({content: messageContent, files: [file]})
                channel.send({content: messageContent, files: [file]});
                channel = client.channels.cache.get('1022934452734787714');
                channel.send({content: messageContent, files: [file]});
            }
            else if(message){
                memberUser.send({content: messageContent});
                interaction.user.send({content: messageContent})
                channel.send({content: messageContent});
                channel = client.channels.cache.get('1022934452734787714');
                channel.send({content: messageContent});
            }
            else
                interaction.reply({ content: 'Wrong message data!', ephemeral: true })
        }
        else{
            interaction.reply({ content: 'You are not worthy!', ephemeral: true })
        }
    }
}