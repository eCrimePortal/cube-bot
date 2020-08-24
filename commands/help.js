// init require
const Discord = require("discord.js");
const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
const owner = process.env.Owner;
const prefix = process.env.Prefix;

// export module
module.exports = {
  name: "help",
  description: "BOT help commands",
  aliases: ["h"],
  ussage: "[command]",
  hidden: false,
  admin: false,
  nsfw: false,
  sadmin: false,
  async execute(cube, message, args) {
    
  }
};
