'use strict';
const ReactDOM = require('react-dom')
const eventually = require('../eventually')
const createSliderDriver = require('./sliderDriver')
const createHistoryDriver = require('./historyDriver')
const simulateEvent = require('./simulateEvent')

module.exports = walletElement => {
  const sliderDriver = () => createSliderDriver(walletElement.querySelector('[data-hook="wallets-slider"]'))

  return {
    async waitForUiToLoad() {
      await eventually(() => {
        if (!document.querySelector('[data-hook=wallet]')) {
          throw 'Wallet has not been found'
        }
      })
    },

    get amountOfWallets() {
      return sliderDriver().amountOfSlides
    },

    get amountOfBreadcrumbs() {
      return sliderDriver().amountOfBreadcrumbs
    },

    get balance() {
      return sliderDriver().currentSlideElement.querySelector('[data-hook="balance"]').textContent
    },

    get currency() {
      return sliderDriver().currentSlideElement.querySelector('[data-hook="currency"]').textContent
    },

    selectNextWallet() {
      sliderDriver().selectNextSlide()
    },

    clickExchangeButton() {
      const excahngeButton = walletElement.querySelector('[data-hook="exchange-button"]')
      simulateEvent(excahngeButton, 'click')
    },

    get history() {
      return createHistoryDriver(walletElement.querySelector('[data-hook="history"]'))
    }
  }
}
