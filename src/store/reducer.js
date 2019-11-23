const {
  LOAD_WALLETS,
  CHANGE_WALLET,
  UPDATE_EXCHANGE_RATES,
  CHANGE_FROM_WALLET_INDEX,
  CHANGE_TO_WALLET_INDEX,
  ENTER_AMOUT_FOR_EXCHANGE,
  ADD_EXCHANGE_TRANSACTION,
  ENTER_DESIRED_EXCHANGE_RESULT
} = require('./actionTypes')
const merge_ = require('lodash/merge')
const cloneDeep_ = require('lodash/cloneDeep')

const initialState = {
  wallets: [],
  currentWalletIndex: 0,
  exchangeRates: {},
  fromWalletIndex: 0,
  toWalletIndex: 1,
  amoutForExchange: null,
  desiredExchangeAmount: null
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
    case ENTER_AMOUT_FOR_EXCHANGE:
      return merge_({}, state, {
        amoutForExchange: action.amount,
        desiredExchangeAmount: null,
      })
    case ENTER_DESIRED_EXCHANGE_RESULT:
      return merge_(state, {
        desiredExchangeAmount: action.amount,
        amoutForExchange: null
      })
    case ADD_EXCHANGE_TRANSACTION:
      const fromWallet = state.wallets.find(({currency}) => currency === action.from)
      const toWallet = state.wallets.find(({currency}) => currency === action.to)
      const transationDate = (new Date()).getTime()

      fromWallet.balance = fromWallet.balance  - action.fromAmount
      fromWallet.history.unshift({
        type: 'withdraw',
        amount: action.fromAmount,
        toCurrency: action.to,
        amountInForeignCurrency: action.toAmount,
        timestamp: transationDate
      })

      toWallet.balance = toWallet.balance  + action.toAmount
      toWallet.history.unshift({
        type: 'top-up',
        amount: action.toAmount,
        fromCurrency: action.from,
        amountInForeignCurrency: action.fromAmount,
        timestamp: transationDate
      })
      
      return cloneDeep_(state)


    default:
      return initialState
  }
}

module.exports = reducer
