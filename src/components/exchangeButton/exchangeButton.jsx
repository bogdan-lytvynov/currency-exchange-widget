require('./exchangeButton.css')
const React = require('react')
const classnames = require('classnames')
const ExchangeIcon = require('./exchange.svg').default

module.exports = ({dataHook, onClick, className}) => {
  return <button data-hook={dataHook} onClick={onClick} className={classnames('exchange-button', className)}>
    <ExchangeIcon/>
  </button>
}
