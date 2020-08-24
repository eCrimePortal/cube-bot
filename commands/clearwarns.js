// export module
const users = require("../models/user");
module.exports = {
  name: "clearinfractions",
  description: "BOT help commands",
  aliases: ["ci"],
  ussage: ["epoch <TIMESTAMP>"],
  hidden: false,

  sadmin: true,
  async execute(cube, message, args) {
    const mlog = cube.channels.cache.get("746612768509132860");
    if (!args[0]) {
      return message.channel.send("No arguments supplied.");
    }
    let uid = args[0];
    if (uid.startsWith("<@") && uid.endsWith(">")) {
      uid = uid.slice(2, -1);
      if (uid.startsWith("!")) {
        uid = uid.slice(1);
      }
    }
    const user = await users.findOne({ id: uid });
    if (!uid) {
      return message.channel.send("Incorrect parameters supplied.");
    }
    if (!user) {
      return message.channel.send(
        `The user model for ${user.name} (${user.id}) does not exist.`
      );
    }
    const infractions = user.infractions;
    let reason = await message.content.split("-reason ");
    if (!reason[1]) {
      reason[1] = "No reason provided";
    }
    if (!user) {
      return message.channel.send(
        `The user model for ${user.name} (${user.id}) does not exist.`
      );}
    user.infractions = [];
    const saved = await user.save();
    message.channel.send(`${saved.id} has zero infractions now.`);
    mlog.send({
      embed: {
        color: cube.colors[4].green,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL()
        },
        title: "Infractions Cleared",
        description: `**Message Content**: \`\`\`${message.content}\`\`\``,
        fields: [
          { name: "User ID", value: uid, inline: true },
          { name: "Channel", value: message.channel.name, inline: true },
          { name: "Moderator", value: message.author.tag, inline: true },
          { name: "Reason", value: reason[1], inline: true },
          { name: "Infraction(s)", value: saved.infractions.length, inline: true },
          { name: "Time", value: Math.floor(new Date() / 1000), inline: true }
        ]
      }
    });
  }
}