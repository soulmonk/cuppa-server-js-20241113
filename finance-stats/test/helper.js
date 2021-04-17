'use strict'

process.env.POSTGRESQL_CONNECTION_STRING = process.env.POSTGRESQL_CONNECTION_STRING || 'postgres://cuppa:toor@localhost/cuppa-finance-stats-test'
// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const App = require('../app')

// Fill in this config with all the configurations
// needed for testing the application
function config () {
  return {}
}

// automatically build and tear down our instance
async function build (t) {
  const app = Fastify()

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), config())

  // tear down our app after we are done
  t.teardown(app.close.bind(app))

  await app.ready()

  return app
}

module.exports = {
  TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTgyNzg3Nzk5fQ.SKy2WyJbMM1MKD6MIA8rO0BQHUox6X23exuNFYIXQK0',
  config,
  build
}
