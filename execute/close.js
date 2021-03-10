const db = require("quick.db")

module.exports = async (user, channel) => {
  
  let userdata = db.get(`ticket_${user.id}`)
  
  let channeldata = db.get(`ticket_${channel.id}`)
  
  if (userdata !== null) {
    user.send("Your Ticket has been closed.\nResponding will make a New Ticket.").catch(() => {})
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
