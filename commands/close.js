const db = require("quick.db")
const config = require("../config.json")

module.exports = {
  name: "close",
  aliases: [],
  run: async (message, args, client) => {
    
    let data = db.get(`ticket_${message.channel.id}`)
    
    if (data === null) return message.channel.send(":x: This is not a Ticket Channel.")
    
    if (!config.roles) return console.log("No Roles has been Added in Config.")
    
    if (!Array.isArray(config.roles)) return console.log("Roles is not an Array in Config.")
    
    if (!message.member.roles.cache.some(r => config.roles.includes(r.id))) return message.channel.send(":x: No Permission!")
   
    let user = client.users.cache.get(data)
    
    let channel = message.channel
    
    require("../execute/close.js")(user, channel)
    
  }
}
