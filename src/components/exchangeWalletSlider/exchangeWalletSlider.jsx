require('./exchangeWalletSlider.css')
const React = require('react')
const {Slider, Slide} = require('../slider')
const getCurrencySymbol = require('../../getCurrencySymbol')
const classnames = require('classnames')

module.exports = ({wallets, startIndex, value, dataHook, onChangeWallet, children, className}) => {
    return <Slider className={classnames(className, 'exchange-wallet-slider')} startIndex={startIndex} dataHook={dataHook} onChangeSlide={onChangeWallet} rightPan={children}>{
      wallets.map((wallet, index) => (<Slide key={index}>
        <div className="exchange-wallet-slider__slide">
          <div data-hook="currency">{wallet.currency}</div>
          <div data-hook="balance">{`You have ${getCurrencySymbol(wallet.currency)}${wallet.balance.toFixed(2)}`}</div>
        </div>
      </Slide>))
    }
    </Slider>
}
