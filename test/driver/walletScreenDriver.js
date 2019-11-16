'use strict';
const ReactDOM = require('react-dom')
const createSliderDriver = require('./sliderDriver')

module.exports = walletElement => {
  const sliderDriver = createSliderDriver(walletElement.querySelector('[data-hook="wallets-slider"]'))

  return {
    async waitForUiToLoad() {
      await new Promise(r => setTimeout(r, 100))
    },

    get balance() {
      return sliderDriver.getCurrentSlideElement().querySelector('[data-hook="balance"]').textContent
    },

    get currency() {
      return sliderDriver.getCurrentSlideElement().querySelector('[data-hook="currency"]').textContent
    },

    selectNextWallet() {
      sliderDriver.selectNextSlide()
    }

    //getHistory() {
    //}
  }
}
