'use strict';
const eventually = require('../eventually')
const createSliderDriver = require('./sliderDriver')
const createHistoryDriver = require('./historyDriver')
const simulateEvent = require('./simulateEvent')
const exchangeWalletDriver = require('./exchangeWalletDriver') 

module.exports = exchangeScreenElement => {
  //const sliderDriver = createSliderDriver(walletElement.querySelector('[data-hook="wallets-slider"]'))

  return {
    async waitForUiToLoad() {
      await eventually(() => {
        if (!exchangeScreenElement.querySelector('[data-hook="exchange-screen"]')) {
          throw Error('Exchange screen has not been found')
        }
      })
    },

    get from() {
      return {
        currency: 'EUR'
      }
    },

    clickCancelButton() {
      const cancelButton = exchangeScreenElement.querySelector('[data-hook="cancel-button"]') 
      simulateEvent(cancelButton, 'click')
    },

    get fromWallet() {
      const fromWalletElement = exchangeScreenElement.querySelector('[data-hook="from-wallet"]')
      return exchangeWalletDriver(fromWalletElement)
    },

    get toWallet() {
      const toWalletElement = exchangeScreenElement.querySelector('[data-hook="to-wallet"]')
      return exchangeWalletDriver(toWalletElement)
    }
  }
}
