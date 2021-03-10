const discord = require("discord.js")

module.exports = async (message, user, channel, client) => {
  
  let embed = new discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
  .setDescription(message.content.split(" ").slice(1).join(" "))
  .setColor("00ff00")
  
  if (message.attachments.array().length > 0) {
    
 
     embed.setImage(message.attachments.array()[0].url)
    }
  
    channel.send(embed).catch(() => {
      message.channel.send(":x: I was unable to DM the User.")
    })
   
   message.channel.send(embed)
  
}