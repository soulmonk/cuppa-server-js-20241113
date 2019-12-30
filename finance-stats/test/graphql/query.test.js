'use strict'

const { test } = require('tap')
const { build } = require('../helper')

// TODO timeout
test('200 response', async t => {
  const app = await build(t)
  const response = await app.inject({
    method: 'POST',
    url: '/graphql',
    payload: {
      query: `{
  transactions(filter: {}) {
    id
  }
}`
    }
  })

  t.strictEqual(response.statusCode, 200)
  t.deepEqual(JSON.parse(response.payload), { data: { transactions: [] } })
})
