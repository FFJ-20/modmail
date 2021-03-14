const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")
const fs = require("fs")

client.commands = new discord.Collection()
client.aliases = new discord.Collection()

let files = fs.readdirSync("./commands/").filter(f => f.endsWith(".js"))

for (let commands of files) {
  
  let cmd = require("./commands/" + commands)
  
  if (cmd.name) {
    client.commands.set(cmd.name, cmd)
  }

  if (cmd.aliases && Array.isArray(cmd.aliases) {
    client.aliases.set(cmd.aliases, cmd)
  
}


client.on("ready", async () => {
  require("./events/ready.js")(client)
})

client.on("message", async message => {
  require("./events/message.js")(message, client)
})

client.login(config.token)
