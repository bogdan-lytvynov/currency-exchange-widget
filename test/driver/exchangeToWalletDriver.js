const creatEexchangeWalletDriver = require('./exchangeWalletDriver') 
const simulateEvent = require('./simulateEvent')

module.exports = walletElement => {
  const exchangeWalletDriver = creatEexchangeWalletDriver(walletElement) 

  const outputDriver = {
    get exchangeResult() {
      return walletElement.querySelector('[data-hook="exchange-result"]').value
    },

    enterAmount(amount) {
      const inputElement = walletElement.querySelector('[data-hook="exchange-result"]')
      inputElement.value = amount
      simulateEvent(inputElement, 'input')
      simulateEvent(inputElement, 'keyup')
    },

    get inversExchangeRate() {
      return walletElement.querySelector('[data-hook="invers-exchange-rate"]').textContent
    }
  }

  return Object.assign({}, exchangeWalletDriver, outputDriver)

}
