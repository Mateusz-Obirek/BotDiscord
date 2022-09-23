const fs = require('fs')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')

module.exports = (client)=>{
    client.handleCommands = async()=>{
        const commandFolders = fs.readdirSync('./commands')
        for(const folder of commandFolders){
            const files = fs.readdirSync(`./commands/${folder}`)
                .filter(file => file.endsWith('.js'))
            const {commands, commandArray} = client
            for(const file of files){
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())
                console.log(`Command: ${command.data.name} has been passed through the handler`)
            }  
        }

        const clientId = '1015629389804875806'
        const guildId = '1018538385322819685'
        const rest = new REST({version: '9'}).setToken(process.env.token)
        try {
            console.log('Started refreshing application (/) commands.');
        
            await rest.put(Routes.applicationCommands(clientId),{ body: client.commandArray });
        
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}