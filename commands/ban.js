// export module
const users = require("../models/user");
module.exports = {
  name: "ban",
  description: "BOT help commands",
  aliases: ["b"],
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
    if (!uid) {
      return message.channel.send("Incorrect parameters supplied.");
    }
    let reason = await message.content.split("-reason ");
    if (!reason[1]) {
      reason[1] = "No reason provided";
    }
    message.guild.members.cache.get(uid).ban(reason[1]);
    mlog.send({
      embed: {
        color: cube.colors[0].red,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL()
        },
        title: "User Banned",
        fields: [
          { name: "Offender ID", value: uid, inline: true },
          { name: "Channel", value: message.channel.name, inline: true },
          { name: "Moderator", value: message.author.tag, inline: true },
          { name: "Reason", value: reason[1], inline: true },
          {
            name: "Infraction(s)",
            value: "Banned",
            inline: true
          },
          { name: "Time", value: Math.floor(new Date() / 1000), inline: true }
        ]
      }
    });
    message.channel.send(
      `${uid} has been permanently banned for ${reason[1]}.`
    );
  }
};
