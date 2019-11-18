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

  getExchangeRateForPair(state, from, to) {
    return get_(state.exchangeRates, [from, to])
  }
}
