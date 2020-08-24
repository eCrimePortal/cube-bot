const log = require('../handlers/logHandler')
module.exports = async (cube) => {
  log.info("Started")
log.discord("Bot has started!")
  console.log(JSON.stringify(cube))
};