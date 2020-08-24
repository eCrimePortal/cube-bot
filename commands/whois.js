const whois = require('whois-json');
module.exports = {
  name: "whois",
  description: "BOT help commands",
  aliases: [],
  ussage: "[command]",
  hidden: false,
  admin: false,
  nsfw: false,
  sadmin: false,
  async execute(cube, message, args) {
  async function whoisarg(url){

	var results = await whois(url);
	message.channel.send({embed: {
    title: "WhoIs - " + results.domainName,
    fields: [
      {name: "Registrar", value: results.registrar, inline: true},
      {name: "Registrant", value: results.registrantName, inline: true},
      {name: "Organization", value: results.registrantOrganization, inline: true},
      {name: "City", value: results.registrantCity, inline: true},
      {name: "Country", value: results.registrantCountry, inline: true},
      {name: "Email", value: results.registrantEmail, inline: true},
      {name: "Nameserver(s)", value: results.nameServer, inline: true},
      {name: "DNSSEC", value: results.dnssec, inline: true},
      {name: "Created On", value: results.creationDate, inline: true},
      {name: "Expiring On", value: results.registrarRegistrationExpirationDate, inline: true}
    ]
  }})
}
    whoisarg(args[0]);
  }
};
