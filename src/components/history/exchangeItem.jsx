const React = require('react')
const getCurrencySymbol = require('./getCurrencySymbol')
module.exports = ({fromCurrency, amount, timestamp, walletCurrency}) => (
  <div className="history__item" data-type="exchange">
    <div className="history__item-description">{`Exchanged from ${fromCurrency}`}</div>
    <div className="history__item-date">{new Date(timestamp).toDateString()}</div>
    <div className="history__item-amount">{`${getCurrencySymbol(walletCurrency)}${amount}`}</div>
    <div className="history__item-amount-in-foreign-currency">{amount}</div>
  </div>
)
