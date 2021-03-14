const discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")

module.exports = {
  name: "setblacklist",
  aliases: [],
  run: async (message, args, client) => {
    
    if (!config.roles) return message.channel.send(":x: No ModRole has been Added in Config.")
    
    if (!Array.isArray(config.roles)) return message.channel.send(":x: The ModRole is not an Array in Config.")
    
    if (!message.member.roles.cache.some(r => config.roles.includes(r.id))) return message.channel.send(":x: No Permission!")
    
    if (!args[0]) return message.channel.send(":x: No User Argument was Given.")
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0])
    
    if (!user) return message.channel.send(":x: Couldn't find the User you're looking for.")
    
    let data = db.get(`blacklist_${user.id}`)
    
    if (!args[1]) return message.channel.send(":x: Please Enter a Blacklist Status.\n\`true\` or \`false\`.")
    
    if (args[1].toLowerCase() === "true") {
      if (data === true) return message.channel.send(":x: The User is already Blackisted.")
      message.channel.send("Successfully Blacklisted User.")
      db.set(`blacklist_${user.id}`, true)
    }
    
  else if (args[1].toLowerCase() === "false") {
      if (data === null) return message.channel.send(":x: The User is not Blacklisted.")
      message.channel.send("Successfully Unblacklisted User.")
      db.delete(`blacklist_${user.id}`)
    }
    
    else {
      message.channel.send(":x: Invalid Status Given.\nPlease use \`true\` or \`false\`.")
    }
    
  }
}
