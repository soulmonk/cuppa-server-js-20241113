'use strict'

const transactionTypeRepository = require('../repository/transaction-type')
const transactionInfoRepository = require('../repository/transaction-info')
const cardRepository = require('../repository/card')
const bankRepository = require('../repository/bank')

function uniqueIds (arr, key) {
  // todo optimize
  return Object.keys(arr.reduce((acc, { obj }) => {
    // todo some id can be string
    if (!isNaN(Number(obj[key]))) {
      acc[obj[key]] = 1;
    }
    return acc
  }, {}))
}

// TODO tbd
function buildLoader (repository, field) {
  return async (parent, { app }) => {
    const ids = uniqueIds(parent, field)
    if (!ids || !ids.length) {
      return [];
    }
    const data = await repository.byIds(app.pg, ids)
    if (!data) {
      return data
    }
    const mapped = data.reduce((acc, row) => (acc[row.id] = row, acc), {})
    return parent.map(({ obj }) => mapped[obj[field]])
  }
}

const typeLoader = buildLoader(transactionTypeRepository, 'type_id')

module.exports = {
  Transaction: {
    type: typeLoader,
    card: buildLoader(cardRepository, 'card_id'),
    info: buildLoader(transactionInfoRepository, 'info_id')
  },
  Stats: {
    type: typeLoader
  },
  Card: {
    bank: buildLoader(bankRepository, 'bank_id')
  }
}
