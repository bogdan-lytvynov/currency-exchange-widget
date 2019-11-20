const {
  LOAD_WALLETS,
  CHANGE_WALLET,
  UPDATE_EXCHANGE_RATES,
  CHANGE_FROM_WALLET_INDEX,
  CHANGE_TO_WALLET_INDEX
} = require('../actionTypes')
const merge_ = require('lodash/merge')

const initialState = {
  wallets: [],
  currentWalletIndex: 0,
  exchangeRates: {},
  fromWalletIndex: 0,
  toWalletIndex: 1
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case LOAD_WALLETS:
      return merge_({}, state, {wallets: action.wallets})
    case CHANGE_WALLET:
      return merge_({}, state, {currentWalletIndex: action.newWalletIndex})
    case UPDATE_EXCHANGE_RATES:
      return merge_({}, state, {exchangeRates: action.rates})
    case CHANGE_FROM_WALLET_INDEX:
      return merge_({}, state, {fromWalletIndex: action.fromWalletIndex})
    case CHANGE_TO_WALLET_INDEX:
      return merge_({}, state, {toWalletIndex: action.toWalletIndex})
    default:
      return initialState
  }
}

module.exports = reducer
