const {SlashCommandBuilder} = require('discord.js')
const members = require('../../członkowie.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('group')
        .setDescription('sends dm to group!')
        .addStringOption(option =>
            option.setName('message').setDescription('Message content')
            .setRequired(true))
    ,
    async execute(interaction, client){
        try{
            if (Object.values(members).includes(interaction.user.id.toString())){
                const message = await interaction.options.getString('message')

                const senderId = await interaction.user.id
                const sender = await Object.keys(members).find(key => members[key]==senderId)
                const messageContent = `**${sender}**: ${message}`
                for(member of Object.keys(members)){
                    const memberUser = await client.users.fetch(members[member])
                    await console.log(memberUser)
                    memberUser.send(messageContent)
                }
                const channel = client.channels.cache.get('1022936085925478430');
                channel.send(messageContent);
                interaction.reply({ content: 'Message has been sent', ephemeral: true })
            }
            else{
                interaction.reply({ content: 'You are not worthy!', ephemeral: true })
            }
        }
        catch(err){
            console.error(err)
        }
    }
}