const {
  LOAD_WALLETS,
  CHANGE_WALLET,
  UPDATE_EXCHANGE_RATES,
  CHANGE_FROM_WALLET_INDEX,
  CHANGE_TO_WALLET_INDEX
} = require('./actionTypes')
const walletsAPI = require('./walletsAPI')
const {getAllWallets} = require('./store/selectors')
const routes = require('./routes')

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
  }
}
