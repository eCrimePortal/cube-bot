// export module
const users = require("../models/user");
module.exports = {
  name: "purge",
  description: "BOT help commands",
  aliases: ["clear"],
  ussage: ["epoch <TIMESTAMP>"],
  hidden: false,

  sadmin: true,
  async execute(cube, message, args) {
    const mlog = cube.channels.cache.get("746612768509132860");
    if (!args[0]) {
      return message.channel.send("No arguments supplied.")
    }
    let uid = args[0];
    if (uid.startsWith("<@") && uid.endsWith(">")) {
      uid = uid.slice(2, -1);
      if (uid.startsWith("!")) {
        uid = uid.slice(1);
      }
    }
    if (args[0].startsWith("<")) {
      let messages = await message.channel.messages.fetch({
    limit: args[1]
  });
      messages = messages.filter(message => message.author.id === uid);
      let clearedMessages = await message.channel.bulkDelete(messages, true);
      await message.channel.send("Cleared " + clearedMessages.size + " messages.")
    } else {
  let messages = await message.channel.messages.fetch({
    limit: args[0]
  });
            let clearedMessages = await message.channel.bulkDelete(messages, true);
      await message.channel.send("Cleared " + clearedMessages.size + " messages.")
    }
  }
};