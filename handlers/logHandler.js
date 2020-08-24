const request = require("request");
const cube = require("../index");
var url = process.env.webhook
exports.info = (infolog) => {
  console.log("[INFO]: " + infolog);
};
exports.warn = (warnlog) => {
  var postData = {"embeds": [{"rich": "true", "title": "Cube Web Log - Warning", "description": warnlog}]}
  var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url
}
request(options)
};
exports.error = (errlog) => {
    var postData = {"embeds": [{"rich": "true", "title": "Cube Web Log - Error", "description": errlog}]}
  var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url
}
request(options)
};
exports.discord = (dlog) => {
  var postData = {"embeds": [{"rich": "true", "title": "Cube Web Log", "description": dlog}]}
  var options = {
  method: 'post',
  body: postData,
  json: true,
  url: url
}
request(options)
};