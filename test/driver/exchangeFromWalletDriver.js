const creatEexchangeWalletDriver = require('./exchangeWalletDriver') 
const simulateEvent = require('./simulateEvent')

module.exports = walletElement => {
  const exchangeWalletDriver = creatEexchangeWalletDriver(walletElement) 

  const inputDriver = {
    enterAmoutForExchange(amount) {
      const inputElement = walletElement.querySelector('[data-hook="amount-to-exchange-input"]')
      inputElement.value = amount
      simulateEvent(inputElement, 'input')
      simulateEvent(inputElement, 'keydown', {keyCode: 13})
    }
  }

  return Object.assign({}, exchangeWalletDriver, inputDriver)

}
