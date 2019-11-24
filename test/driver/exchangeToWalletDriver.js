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
      //hack but looks like jsdom does't care about blur of focued element when you focus another input
      simulateEvent(document.activeElement, 'blur')
      simulateEvent(inputElement, 'focus')
      inputElement.value = amount
      simulateEvent(inputElement, 'input')
    },

    get inversExchangeRate() {
      return walletElement.querySelector('[data-hook="invers-exchange-rate"]').textContent
    }
  }

  return Object.assign({}, exchangeWalletDriver, outputDriver)

}
