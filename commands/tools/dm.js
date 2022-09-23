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
				{ name: 'Huragan', value: 'Huragan'}
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
            memberUser.send(`${sender}->${member}:${message}`)
            interaction.reply({ content: 'Message has been sent', ephemeral: true })
        }
        else{
            interaction.reply({ content: 'You are not worthy!', ephemeral: true })
        }
    }
}