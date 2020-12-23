const R = require('ramda')
const F = require('fluture')
const FST = require('fluture-sanctuary-types')
const { create, env } = require('sanctuary')
const S = create({
  // Dev mode: true, Production mode: false
  // checkTypes: false, // Production mode
  // checkTypes: true, // Dev mode
  checkTypes: !(process.env.NODE_ENV === 'production'),
  env: env.concat(FST.env),
})
const $ = require('sanctuary-def')

module.exports = { R, F, S, $ }
