const React = require('react')
const {Slider, Slide} = require('./components/slider')

module.exports = () => (<div>
  <div style={{width: '300px', border: '1px solid black', height: '200px'}}>
  <Slider loop={true} dataHook="wallets-slider">
    <Slide>
      <div data-hook="balance">100</div>
      <div data-hook="currency">USD-american dollar</div>
    </Slide>
    <Slide>
      <div data-hook="balance">150</div>
      <div data-hook="currency">EUR-euro</div>
    </Slide>
    <Slide>
      <div data-hook="balance">1020</div>
      <div data-hook="currency">UAH-ukrain hrivna</div>
    </Slide>
  </Slider>
  </div>
</div>)
