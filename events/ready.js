const config = require("../config.json")

module.exports = async (client) => {
  
  console.log(client.user.tag + " is Online\nMade by Fighter for Justice 2.0")
  
  if (!config.activity) config.activity = "DMs."
  
  if (!config.type) config.type = "WATCHING"
  
  if (!config.status) config.status = "online"
  
  client.user.setPresence({
    activity: {
      "name": config.activity,
      "type": config.type
    },
    status: config.status
  })
  
}
