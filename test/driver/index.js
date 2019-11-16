const sliderDriver = require('./sliderDriver')
module.exports = widgetContainer => ({
  walletSlider: sliderDriver(widgetContainer.querySelector('.wallets-slider'))
})
