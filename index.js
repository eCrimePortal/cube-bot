const discord = require("discord.js");
const fs = require("fs");
const cube = require("./structures/botClient");
const cmdir = "./commands";
cube.commands = new discord.Collection();
cube.colors = new discord.Collection();

cube.colors = [{ "red": "0xff0000" }, { "yellow": "0xfffb1c" }, { "orange": "0xff8b1f" }, { "blue": "0x17b2ff" }, { "green": "0x1fff22" }, { "brightred": "0xff4221" }]

const mongoose = require("mongoose");
mongoose.connect(process.env.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on("error", console.log.bind(console, "Could not connect to the database!"));
db.once("open", function() {
  console.log("Connected to the database!");
});
const commandFiles = fs.readdirSync(cmdir).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`${cmdir}/${file}`);
  cube.commands.set(command.name, command);
  console.log(`Loading: ${file} as ${command.name}`);
  command.aliases.map(e => {
    cube.commands.set(e, command);
    console.log(`Loading: ${file} as ${e}`);
  });
}
fs.readdir("./events/", (err, files) => {
  if (err) cube.logger.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    cube.on(eventName, event.bind(null, cube));
  });
});
cube.on("message", async message => {
  const prefix = "!";
  if (message.guild == null) {
    return;
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();  
  if (!cube.commands.has(command)) return;
  var comid = cube.commands.get(command);
  if (comid.sadmin && !message.member.hasPermission("MANAGE_GUILD")) return;
  try {
    comid.execute(cube, message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

cube
  .login(process.env.token)
  .then(e => {
    require("./handlers/logHandler");
  })
  .catch(err => console.log(err));
module.exports = cube;
