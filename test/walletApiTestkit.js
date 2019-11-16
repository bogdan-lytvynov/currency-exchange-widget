module.exports = {
  createWallets(wallets) {
    window.localStorage.setItem('wallets', JSON.stringify(wallets))
  }
}
