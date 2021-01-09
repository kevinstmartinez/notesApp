const { format } = require('timeago.js')
const helpers = {}

helpers.timeago = timestamp => format(timestamp)

module.exports = helpers