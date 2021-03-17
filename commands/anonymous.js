const discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports = {
  name: "anonymous",
  aliases: ["anonreply", "anon", "ar"],
  run: async (message, args, client) => {
    
    let data = db.get(`ticket_${message.channel.id}`)
    
    if (data === null) return message.channel.send(":x: This is not a Ticket Channel.")
    
    if (!config.roles) return console.log("No Roles has been Added in Config.")
    
    if (!Array.isArray(config.roles)) return console.log("Roles is not an Array in Config.")
    
    if (!message.member.roles.cache.some(r => config.roles.includes(r.id))) return message.channel.send(":x: No Permission!")
    
    if (!args[0] && !message.attachments) return message.channel.send(":x: No Content has been Given to Send.")
    
    let user = client.users.cache.get(data)
    
    if (!user) return message.channel.send(":x: Oops!\nI couldn't find the User.\nMaybe the User has Left the Server.")
    
    let channel = user.dmChannel || await user.createDM()
   
   if (!args[0] && message.attachments.array().length === 0) return message.channel.send(":x: No Content or Attachment have been Included.")
   
   let anonymous = true
    
    require("../execute/senddm.js")(message, args, user, channel, anonymous, client)
    
  }
}
