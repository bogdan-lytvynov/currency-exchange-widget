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
      
      //hack but looks like jsdom does't care about blur of focued element when you focus another input
      simulateEvent(document.activeElement, 'blur')
      simulateEvent(inputElement, 'focus')
      inputElement.value = amount 
      simulateEvent(inputElement, 'input')
    }
  }

  return Object.assign({}, exchangeWalletDriver, inputDriver)

}
