const { compile, match } = require("path-to-regexp");

const exchangeRoute = '/exchange/:from/:to?'
exports.exchange = {
  toPath: compile(exchangeRoute),
  match: match(exchangeRoute)
}
