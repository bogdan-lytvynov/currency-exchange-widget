const React = require('react')
const {Slider, Slide} = require('../slider')
const getCurrencySymbol = require('../../getCurrencySymbol')

  module.exports = ({wallets, startIndex, value, dataHook, onChangeWallet}) => {
    return <Slider startIndex={startIndex} dataHook={dataHook} onChangeSlide={onChangeWallet}>{
    wallets.map((wallet, index) => (<Slide key={index}>
      <div data-hook="currency">{wallet.currency}</div>
      <div data-hook="balance">{`You have ${getCurrencySymbol(wallet.currency)}${wallet.balance}`}</div>
    </Slide>))
  }</Slider>
}
