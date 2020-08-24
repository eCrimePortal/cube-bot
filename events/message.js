// const users = require("./users");
const guildmod = require("../models/guild");
const users = require("../models/user");
module.exports = async (cube, message) => {
  const mlog = cube.channels.cache.get("746612768509132860");
  async function mlogsend(title, reason, infs, color) {
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
          { name: "Moderator", value: cube.user.tag, inline: true },
          { name: "Reason", value: reason, inline: true },
          { name: "Infraction(s)", value: infs, inline: true },
          { name: "Time", value: Math.floor(new Date() / 1000), inline: true }
        ]
      }
    });
  }
  async function checkinfractions(inf) {
    const user = await users.findOne({ id: message.author.id });
    inf = user.infractions.length;
    return inf;
  }
  const bguild = await guildmod.find();
  if (
    new RegExp(bguild[0].blacklist.join("|")).test(
      message.content.toLowerCase()
    )
  ) {
    const user = await users.findOne({ id: message.author.id });
    const infractions = user.infractions;
    const curinfracs = infractions.concat("Using profane language");
    user.infractions = curinfracs;
    const saved = await user.save();
    mlogsend(
      "Message Deleted",
      "Using profane language",
      await saved.infractions.length,
      cube.colors[5].brightred
    );
    message.delete();

    if (saved.infractions.length >= 5) {
      const mutedrole = message.guild.roles.cache.get("746700832556187718");
      message.member.roles.add(mutedrole);
      mlogsend(
        "User Muted",
        "5+ Infractions",
        await saved.infractions.length,
        cube.colors[2].orange
      );
    }
    if (saved.infractions.length >= 10) {
      message.member.kick;
      mlogsend(
        "User Kicked",
        "10+ Infractions",
        await saved.infractions.length,
        cube.colors[0].red
      );
    }
  }
  if (message.member.hasPermission("MANAGE_GUILD")) return;

  if (message.content.includes("https://ecrime.xyz")) {
    return;
  }
  if (
    new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    ).test(message.content)
  ) {
    const user = await users.findOne({ id: message.author.id });
    const infractions = user.infractions;
    const curinfracs = infractions.concat("Sent a link");
    user.infractions = curinfracs;
    const saved = await user.save();
    mlogsend(
      "Message Deleted",
      "Sent a link",
      await saved.infractions.length,
      cube.colors[5].brightred
    );
    message.delete();

    if (saved.infractions.length >= 5) {
      const mutedrole = message.guild.roles.cache.get("746700832556187718");
      message.member.roles.add(mutedrole);
      mlogsend(
        "User Muted",
        "5+ Infractions",
        await saved.infractions.length,
        cube.colors[2].orange
      );
    }
    if (saved.infractions.length >= 10) {
      message.member.kick;
      mlogsend(
        "User Kicked",
        "10+ Infractions",
        await saved.infractions.length,
        cube.colors[0].red
      );
    }
  }
};
