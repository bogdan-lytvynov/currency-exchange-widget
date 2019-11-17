const React = require('react')
const getCurrencySymbol = require('../../getCurrencySymbol')
module.exports = ({fromCurrency, amount, timestamp, walletCurrency}) => (
  <div className="history__item" data-type="top-up">
    <div className="history__item-description">Top up</div>
    <div className="history__item-date">{new Date(timestamp).toDateString()}</div>
    <div className="history__item-amount">{`${getCurrencySymbol(walletCurrency)}${amount}`}</div>
  </div>
)
