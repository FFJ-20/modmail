const discord = require("discord.js")

module.exports = async (message, args, user, channel, anonymous, client) => {
  
  let embed = new discord.MessageEmbed()
  .setDescription(args.join(" "))
  .setColor("00ff00")
  
  if (message.attachments.array().length > 0) {
     embed.setImage(message.attachments.array()[0].url)
    }
    
    if (anonymous === true) {
      embed.setAuthor("Anonymous", "https://is.gd/tSxaUL")
    }
    
    else {
      embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", size: 2048, dynamic: true }))
    }
  
    channel.send(embed).catch(() => {
      message.channel.send(":x: I was unable to DM the User.")
    })
   
   message.channel.send(embed)
  
}
