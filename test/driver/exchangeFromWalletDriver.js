const creatEexchangeWalletDriver = require('./exchangeWalletDriver') 
const simulateEvent = require('./simulateEvent')

module.exports = walletElement => {
  const exchangeWalletDriver = creatEexchangeWalletDriver(walletElement) 

  const inputDriver = {
    get amountForExcahnge() {
      return walletElement.querySelector('[data-hook="amount-to-exchange-input"]').value
    },

    enterAmount(amount) {
      const inputElement = walletElement.querySelector('[data-hook="amount-to-exchange-input"]')
      
      inputElement.value = amount 
      simulateEvent(inputElement, 'input')
    }
  }

  return Object.assign({}, exchangeWalletDriver, inputDriver)

}
