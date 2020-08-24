// export module
const users = require("../models/user");
module.exports = {
  name: "mute",
  description: "BOT help commands",
  aliases: ["m"],
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
    const curinfracs = infractions.concat(reason[1]);
    user.infractions = curinfracs;
    const saved = await user.save();
    message.guild.members.cache
      .get(saved.id)
      .send(`You have been muted in the eCrimePortal for ${await reason[1]}.`);
    const mutedrole = message.guild.roles.cache.get("746700832556187718");
    message.guild.members.cache.get(uid).roles.add(mutedrole);
    mlog.send({
      embed: {
        color: cube.colors[0].red,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL()
        },
        title: "User Muted",
        fields: [
          { name: "Offender ID", value: uid, inline: true },
          { name: "Channel", value: message.channel.name, inline: true },
          { name: "Moderator", value: message.author.tag, inline: true },
          { name: "Reason", value: reason[1], inline: true },
          {
            name: "Infraction(s)",
            value: saved.infractions.length,
            inline: true
          },
          { name: "Time", value: Math.floor(new Date() / 1000), inline: true }
        ]
      }
    });
    message.channel.send(
      `${saved.id} has been muted for ${reason[1]}. This is their ${
        saved.infractions.length
      } infraction.`
    );
    if (saved.infractions.length === 10) {
      message.guild.members.cache.get(saved.id).kick;
      mlog.send({
        embed: {
          color: cube.colors[0].red,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL()
          },
          title: "User Kicked",
          fields: [
            { name: "Offender ID", value: uid, inline: true },
            { name: "Channel", value: message.channel.name, inline: true },
            { name: "Moderator", value: cube.user.tag, inline: true },
            { name: "Reason", value: reason[1], inline: true },
            {
              name: "Infraction(s)",
              value: saved.infractions.length,
              inline: true
            },
            { name: "Time", value: Math.floor(new Date() / 1000), inline: true }
          ]
        }
      });
    }
  }
};
