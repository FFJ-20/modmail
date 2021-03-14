const discord = require("discord.js")

module.exports = {
  name: "ping",
  aliases: [],
  run: async (message, args, client) => {
    
    message.channel.send(":ping_pong: Pinging...").then(m => m.edit(`:ping_pong: Pong!\nBot Ping - ${client.ws.ping}ms\nAPI Ping - ${Date.now() - m.createdTimestamp}ms`))
    
  }
}
