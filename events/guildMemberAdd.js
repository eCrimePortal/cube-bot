const users = require("../models/user");
const log = require('../handlers/logHandler')
module.exports = async (cube, member) => {
  users.create({
    id: member.id,
    name: member.user.username
  });
  cube.channels.cache
    .get("746612768509132860")
    .send(
      `User model for ${member.user.tag} (${member.id}) created successfully.`
    );
  member.user.createDM().then(dmchannel => {
    dmchannel.send(
      `Hello, ${member.user.username}.\n\nThank you for joining the eCrimePortal Global Discord server. We are a community of like minded Cyber Security enthusiasts that aim to eradicate cybercrimes.\n\n*Before you begin to chat in the server, make sure to read our <#738864778289872908> carefully.*`
    );
  });
};