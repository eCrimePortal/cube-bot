// export module
const users = require("../models/user");
module.exports = {
  name: "warn",
  description: "BOT help commands",
  aliases: ["w"],
  ussage: ["epoch <TIMESTAMP>"],
  hidden: false,

  sadmin: true,
  async execute(cube, message, args) {
    async function mlogsend(title, reason, infs, color, mod) {
      mlog.send({
        embed: {
          color: color,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL()
          },
          title: title,
          description: `**Message Content**: \`\`\`${message.content}\`\`\``,
          fields: [
            { name: "Offender ID", value: message.author.id, inline: true },
            { name: "Channel", value: message.channel.name, inline: true },
            { name: "Moderator", value: mod, inline: true },
            { name: "Reason", value: reason, inline: true },
            { name: "Infraction(s)", value: infs, inline: true },
            { name: "Time", value: Math.floor(new Date() / 1000), inline: true }
          ]
        }
      });
    }
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
      .send(`You have been warned in the eCrimePortal for ${await reason[1]}.`);
    message.channel.send(
      `${saved.id} has been warned for ${reason[1]}. This is their ${
        saved.infractions.length
      } infraction.`
    );
    mlogsend(
      "User Warned",
      reason,
      await saved.infractions.length,
      cube.colors[0].red,
      message.author.tag
    );
    if (saved.infractions.length === 5) {
      const mutedrole = message.guild.roles.cache.get("746700832556187718");
      message.guild.members.cache
      .get(saved.id).roles.add(mutedrole);
      mlogsend(
        "User Muted",
        "5+ Infractions",
        await saved.infractions.length,
        cube.colors[2].orange,
        cube.user.tag
      );
    }
    if (saved.infractions.length === 10) {
      message.guild.members.cache
      .get(saved.id).kick;
      mlogsend(
        "User Kicked",
        "10+ Infractions",
        await saved.infractions.length,
        cube.colors[0].red,
        cube.user.tag
      );
    }
  }
};
