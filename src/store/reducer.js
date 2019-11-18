const {LOAD_WALLETS, CHANGE_WALLET, UPDATE_EXCHANGE_RATES} = require('../actionTypes')
const merge_ = require('lodash/merge')

const initialState = {
  wallets: [],
  currentWalletIndex: 0,
  exchangeRates: {}
}

const reducer = (state, action) => {
  switch(action.type) {
    case LOAD_WALLETS:
      return merge_({}, state, {wallets: action.wallets})
    case CHANGE_WALLET:
      return merge_({}, state, {currentWalletIndex: action.newWalletIndex})
    case UPDATE_EXCHANGE_RATES:
      return merge_({}, state, {exchangeRates: action.rates})
  }
}

reducer.initialState = initialState
module.exports = reducer
