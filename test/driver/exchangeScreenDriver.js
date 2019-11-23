'use strict';
const eventually = require('../eventually')
const createSliderDriver = require('./sliderDriver')
const createHistoryDriver = require('./historyDriver')
const simulateEvent = require('./simulateEvent')
const createExchangeFromWalletDriver = require('./exchangeFromWalletDriver')
const createExchangeToWalletDriver = require('./exchangeToWalletDriver')

module.exports = exchangeScreenElement => {
  //const sliderDriver = createSliderDriver(walletElement.querySelector('[data-hook="wallets-slider"]'))

  return {
    async waitForUiToLoad() {
      await eventually(() => {
        if (!exchangeScreenElement.querySelector('[data-hook="exchange"]')) {
          throw Error('Exchange screen has not been found')
        }
      })
    },

    clickCancelButton() {
      const cancelButton = exchangeScreenElement.querySelector('[data-hook="cancel-button"]') 
      simulateEvent(cancelButton, 'click')
    },

    clickExchangeButton() {
      const exchangeButton = exchangeScreenElement.querySelector('[data-hook="exchange-button"]') 
      simulateEvent(exchangeButton, 'click')
    },

    get fromWallet() {
      const fromWalletElement = exchangeScreenElement.querySelector('[data-hook="from-wallet"]')
      return createExchangeFromWalletDriver(fromWalletElement)
    },

    get toWallet() {
      const toWalletElement = exchangeScreenElement.querySelector('[data-hook="to-wallet"]')
      return createExchangeToWalletDriver(toWalletElement)
    },

    get exchangeRate() {
      return exchangeScreenElement.querySelector('[data-hook="exchange-rate"]').textContent
    }
  }
}
