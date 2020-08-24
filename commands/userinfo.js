// export module
const users = require("../models/user");
module.exports = {
  name: "userinfo",
  description: "BOT help commands",
  aliases: [],
  ussage: "[command]",
  hidden: false,
  admin: false,
  nsfw: false,
  sadmin: false,
  async execute(cube, message, args) {
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
    const user = message.guild.members.cache.get(uid)
    const count = await users.findOne({ id: uid });
   await message.channel.send({embed: {
     thumbnail: user.user.avatarURL(),
     title: `User Info - ${user.user.tag}`,
     description: user.roles.cache.map(r => `${r.name}`).join(' | '),
     fields:[
      {name: "Name", value: user.user.username, inline: true},
       {name: "Discriminator", value: user.user.discriminator, inline: true},
       {name: "Created On", value: user.user.createdAt, inline: true},
       {name: "Joined On", value: user.joinedAt, inline: true},
       {name: "User ID", value: user.user.id, inline: true},
       {name: "Infractions", value: count.infractions.length, inline: true}
     ]
   }})
  }
};
