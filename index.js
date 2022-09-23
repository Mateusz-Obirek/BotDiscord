const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config()
const {token} = process.env
const fs = require('fs')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()
client.commandArray = [ ]

const functionFolders = fs.readdirSync('./functions')
for(const folder of functionFolders){
    const files = fs.readdirSync(`./functions/${folder}`)
        .filter(file => file.endsWith('.js'))
    for(const file of files) require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents()
client.handleCommands() 
client.login(token);