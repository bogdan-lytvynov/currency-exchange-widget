const React = require('react')
const getCurrencySymbol = require('../../getCurrencySymbol')
module.exports = ({toCurrency, amount, amountInForeignCurrency, timestamp, walletCurrency}) => (
  <div className="history__item history__item--withdraw">
    <div className="history__item-description">{`Exchanged to ${toCurrency}`}</div>
    <div className="history__item-amount">{`${getCurrencySymbol(walletCurrency)}${amount}`}</div>
    <div className="history__item-date">{new Date(timestamp).toDateString()}</div>
    <div className="history__item-amount-in-foreign-currency">{`${getCurrencySymbol(toCurrency)}${amountInForeignCurrency}`}</div>
  </div>
)
