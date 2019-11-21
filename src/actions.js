const {
  LOAD_WALLETS,
  CHANGE_WALLET,
  UPDATE_EXCHANGE_RATES,
  CHANGE_FROM_WALLET_INDEX,
  CHANGE_TO_WALLET_INDEX,
  ENTER_AMOUT_FOR_EXCHANGE,
  ADD_EXCHANGE_TRANSACTION
} = require('./actionTypes')
const walletsAPI = require('./walletsAPI')
const {getAllWallets} = require('./store/selectors')
const routes = require('./routes')

const  addExchangeTransaction = ({from, to, toAmount, fromAmount}) => {
    return {
      type: ADD_EXCHANGE_TRANSACTION,
      to,
      from,
      toAmount,
      fromAmount
    }
  }

module.exports = {
  loadWallets(dispatch) {
    const wallets = walletsAPI.getAll()
    dispatch({
      type: LOAD_WALLETS,
      wallets
    })
  },
  changeWallet(index) {
    return {
      type: CHANGE_WALLET,
      newWalletIndex: index
    }
  },
  updateExchangeRates(rates) {
    return {
      type: UPDATE_EXCHANGE_RATES,
      rates
    }
  },

  changeFromWallet: fromWalletIndex => (dispatch, getState, {history}) => {
    const state = getState()
    const wallets = getAllWallets(state)
    const fromWalletCurrency = wallets[fromWalletIndex].currency
    const {params: {to}} = routes.exchange.match(history.location.pathname)

    history.push(routes.exchange.toPath({from: fromWalletCurrency, to}))
  },

  changeToWallet: toWalletIndex => (dispatch, getState, {history}) => {
    const state = getState()
    const {params: {from}} = routes.exchange.match(history.location.pathname)
    const wallets = getAllWallets(state)
    const toWalletCurrency = wallets[toWalletIndex].currency

    history.push(routes.exchange.toPath({from, to: toWalletCurrency}))
  },

  enterAmountForExchange(amount) {
    return {
      type: ENTER_AMOUT_FOR_EXCHANGE,
      amount
    }
  },

  exchange: ({amountForExchange, from, to, exchangeRate}) => (dispatch, getState, {history}) => {
    dispatch(addExchangeTransaction({
      to,
      from, 
      toAmount: amountForExchange * exchangeRate,
      fromAmount: amountForExchange 
    })) 

    history.push(`/wallet/${from}`)
  },

  addExchangeTransaction
}
