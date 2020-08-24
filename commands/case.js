// export module
module.exports = {
  name: "case",
  description: "BOT help commands",
  aliases: ["c"],
  ussage: ["epoch <TIMESTAMP>"],
  hidden: false,

  sadmin: true,
  async execute(cube, message, args) {
    const mlog = cube.channels.cache.get("746612768509132860");
    if (!args[0]) {
      return message.channel.send("No arguments supplied.")
    }
    const pcd = await mlog.messages.fetch(args[0]).catch(e => {
      return message.channel.send("Invalid case ID.");
    });
    if (!pcd.embeds[0].title) {
      return message.channel.send("Not a valid case!")
    }
    message.channel.send({
      embed: {
        color: cube.colors[3].blue,
        description: "Action taken: ```" + pcd.embeds[0].title + "```",
        title: "Case Information - " + args[0],
        fields: pcd.embeds[0].fields
      }
    }).catch(e => {
      message.channel.send("Oops?")
    });
  }
};
