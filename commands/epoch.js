// export module
module.exports = {
  name: "epoch",
  description: "BOT help commands",
  aliases: ["e"],
  ussage: ["epoch <TIMESTAMP>"],
  hidden: false,
  sadmin: false,
  async execute(cube, message, args) {
    if (!args[0]) {
      return await message.channel.send(`Current Unix epoch time is \`${Math.floor(new Date() / 1000)}\``);
    }
    var d = new Date(0);
    await message.channel.send(`\`${args[0]}\` translates to \`\`\`${new Date(args[0] * 1000)}\`\`\``)
  }
};
