const discord = require("discord.js")
const db = require("quick.db")

module.exports = async (user, channel) => {
  
  let userdata = db.get(`ticket_${user.id}`)
  
  let channeldata = db.get(`ticket_${channel.id}`)
  
  let embed = new discord.MessageEmbed()
  .setTitle("Ticket Closed")
  .setColor("RANDOM")
  .setDescription("Your Ticket has been Closed.\nResponding now will create a new ticket.\n\nFeel free to contact us again if you need any kind of help.\nThank you for using our ModMail Service.")
  
  if (userdata !== null) {
    user.send(embed).catch(() => {})
    db.delete(`ticket_${user.id}`)
  }
  
  if (channeldata !== null) {
    
    channel.send("This Ticket Channel has been Closed.\nChannel will be Deleted in 10 Seconds.")
    db.delete(`ticket_${channel.id}`)
    
    setTimeout(() => {
    channel.delete()
    }, 10000)
    
  }
  
}
