const config = require("../config.json")

module.exports = async (client) => {
  
  console.log(client.user.tag + " is Online\nMade by Fighter for Justice 2.0")
  
  if (config.activity === "null") config.activity = null

  if (config.type === "null") config.type = null

  if (config.status === "null") config.status = null

  client.user.setPresence({
    activity: {
      name: config.activity,
      type: config.type
    },
    status: config.status
  })
  
}
