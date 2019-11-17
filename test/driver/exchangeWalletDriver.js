const createSliderDriver = require('./sliderDriver')

module.exports = exchangeWallet => {
  const sliderDriver = createSliderDriver(exchangeWallet)

  return {
    get balance() {
      return sliderDriver.currentSlideElement.querySelector('[data-hook="balance"]').textContent
    },
    get currency() {
      return sliderDriver.currentSlideElement.querySelector('[data-hook="currency"]').textContent
    }
  }

}
