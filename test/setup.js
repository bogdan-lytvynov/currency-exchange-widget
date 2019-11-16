const createWalletScreenDriver = require('./walletScreenDriver')

module.exports = () => {
  const mountPoint = document.getElementById('mount-point')

  return {
    walletScreen: createWalletScreenDriver()
  }
}
