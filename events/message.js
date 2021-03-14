const discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")
const ms = require("ms")

module.exports = async (message, client) => {
  
  if (message.channel.type === "text" && !message.author.bot) {
  
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

 
    let args = message.content.slice(config.prefix.length).trim().split(" ")
    
    let cmd = args.shift().toLowerCase()
    
    if (cmd.length === 0) return;
    

    let command = client.commands.get(cmd) || client.aliases.get(cmd)

    if (!command) return;

    command.run(message, args, client)
        
  }
  
  else if (message.channel.type === "dm" && !message.author.bot) {
    
    let blacklist = db.get(`blacklist_${message.author.id}`)
    
    if (blacklist === true) return message.react("❌")

    if (!config.guild) return console.log("Guild ID has not been Given in Config.")
    
    let guild = client.guilds.cache.get(config.guild)
    
    if (!guild) return console.log("Invalid Guild ID has been Given in Config.")
    
    if (!guild.me.hasPermission("ADMINISTRATOR")) return console.log("The Bot is Missing Administrator Permission.\nThis is just to make sure that bot doesn't returns any error due to lack of Permissions.")
    
    if (!config.category) return console.log("No Category ID has been Given in Config.")
    
    let category = client.channels.cache.get(config.category)
    
    if (!category || category.type !== "category") return console.log("Invalid Category ID has been Given in Config.")
    
    let data = db.get(`ticket_${message.author.id}`)
    
    if (data === null) {
      
   let ticket = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`, { topic: `Ticket Owner: ${message.author.tag} | ${message.author.id}`, parent: category })
     
     ticket.updateOverwrite(guild.id, {
       "VIEW_CHANNEL": false
     })
     
     if (config.roles && Array.isArray(config.roles)) {
       
       for (let i = 0; i < config.roles.length; i++) {
         let r = guild.roles.cache.get(config.roles[i])
       
       if (!r) return console.log(`Invalid Role ID ${config.roles[i]} in Config.`)

       ticket.updateOverwrite(r, {
         "VIEW_CHANNEL": true,
         "SEND_MESSAGES": true,
         "READ_MESSAGE_HISTORY": true,
         "ATTACH_FILES": true
       })
      
       }
     
     }
     
   let creation = ms(Date.now() - message.author.createdTimestamp, { long: true })
     
   let newticket = new discord.MessageEmbed()
     .setTitle("Ticket Created")
     .setColor("RANDOM")
     .addFields(
       { name: "User", value: message.author.tag, inline: false },
       { name: "User ID", value: message.author.id, inline: false },
       { name: "Account Creation", value: creation + " ago", inline: false },
       { name: "Roles", value: guild.members.cache.get(message.author.id).roles.cache.map(r => r.toString()).join("\n"), inline: false },
       { name: "Notes", value: "Use \`reply\` command to reply and \`close\` command to close the ticket.", inline: false }
       )
       
       ticket.send(newticket).then(m => m.pin()).catch(() => {})
     
     message.author.send("Your Ticket has been Created.\nPlease wait for someone to Respond.\nYou can type \`close\` if you want to close this Ticket.").catch(() => {})
     
     db.set(`ticket_${message.author.id}`, ticket.id)
     db.set(`ticket_${ticket.id}`, message.author.id)
      
      require("../execute/sendchannel.js")(message, ticket)
      
    }
    
    else if (data !== null) {
      
      let channel = client.channels.cache.get(data)
      
      if (message.content.toLowerCase() === "close") return require("../execute/close.js")(message.author, channel)
      
      require("../execute/sendchannel.js")(message, channel, client)
      
    }
    
  }
}
