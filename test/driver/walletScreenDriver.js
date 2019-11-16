'use strict';
const ReactDOM = require('react-dom')
const createSliderDriver = require('./sliderDriver')
const createHistoryDriver = require('./historyDriver')

module.exports = walletElement => {
  const sliderDriver = createSliderDriver(walletElement.querySelector('[data-hook="wallets-slider"]'))

  return {
    async waitForUiToLoad() {
      await new Promise(r => setTimeout(r, 100))
    },

    get amountOfWallets() {
      return sliderDriver.amountOfSlides
    },

    get amountOfBreadcrumbs() {
      return sliderDriver.amountOfBreadcrumbs
    },

    get balance() {
      return sliderDriver.currentSlideElement.querySelector('[data-hook="balance"]').textContent
    },

    get currency() {
      return sliderDriver.currentSlideElement.querySelector('[data-hook="currency"]').textContent
    },

    selectNextWallet() {
      sliderDriver.selectNextSlide()
    },

    get history() {
      return createHistoryDriver(walletElement.querySelector('[data-hook="history"]'))
    }
  }
}
