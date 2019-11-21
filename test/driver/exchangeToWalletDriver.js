const creatEexchangeWalletDriver = require('./exchangeWalletDriver') 
const simulateEvent = require('./simulateEvent')

module.exports = walletElement => {
  const exchangeWalletDriver = creatEexchangeWalletDriver(walletElement) 

  const outputDriver = {
    get exchangeResult() {
      return walletElement.querySelector('[data-hook="exchange-result"]').textContent
    },

    get inversExchangeRate() {
      return walletElement.querySelector('[data-hook="invers-exchange-rate"]').textContent
    }
  }

  return Object.assign({}, exchangeWalletDriver, outputDriver)

}
