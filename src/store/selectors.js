const get_ = require('lodash/get')
module.exports = {
  getAllWallets(state) {
    return state.wallets
  },

  getWalletHistory(state) {
    const wallet = state.wallets[state.currentWalletIndex]
    return wallet ? wallet.history : []
  },

  getWalletCurrency(state) {
    const wallet = state.wallets[state.currentWalletIndex]
    return wallet ? wallet.currency : ''
  },

  getExchangeRate(fromWalletCurrency, toWalletCurrency) {
    return state => get_(state.exchangeRates, [fromWalletCurrency, toWalletCurrency])
  },

  getAmountForExchange(state) {
    return state.amoutForExchange
  }
}
