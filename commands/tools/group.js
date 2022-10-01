const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js')
const members = require('../../członkowie.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('group')
        .setDescription('sends dm to group!')
        .addStringOption(option =>
            option.setName('message').setDescription('Message content')
            .setRequired(false))
        .addAttachmentOption(option =>
            option.setName('attachment').setDescription('file or image')
            .setRequired(false))
    ,
    async execute(interaction, client){
        try{
            if (Object.values(members).includes(interaction.user.id.toString())){
                const message = await interaction.options.getString('message')
                const attachment = await interaction.options.getAttachment('attachment')

                const file = attachment?await new AttachmentBuilder(attachment.url):null

                const senderId = await interaction.user.id
                const sender = await Object.keys(members).find(key => members[key]==senderId)
                const messageContent = message?`**${sender}**: ${message}`:''
                const channel = client.channels.cache.get('1022936085925478430');

                if(attachment){
                    interaction.reply({content:'Message has been send!', ephemeral:true})
                    for(member of Object.keys(members)){
                        const memberUser = await client.users.fetch(members[member])
                        await memberUser.send({content: messageContent, files: [file]})
                    }
                    channel.send({content: messageContent, files: [file]});
                }
                else if(message){
                    interaction.reply({content:'Message has been send!', ephemeral:true})
                    for(member of Object.keys(members)){
                        const memberUser = await client.users.fetch(members[member])
                        memberUser.send({content: messageContent})
                    }
                    channel.send({content: messageContent});
                }
                else
                    interaction.reply({ content: 'Wrong message data!', ephemeral: true })
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