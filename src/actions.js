const {LOAD_WALLETS, CHANGE_WALLET} = require('./actionTypes')
const walletsAPI = require('./walletsAPI')

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
  }
}
