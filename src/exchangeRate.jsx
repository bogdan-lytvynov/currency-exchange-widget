const React = require('react')
const getCurrencySymbol = require('./getCurrencySymbol')

module.exports = ({exchangeRate, fromCurrency, toCurrency}) => {
  return <div data-hook="exchange-rate">{`${getCurrencySymbol(fromCurrency)}1=${getCurrencySymbol(toCurrency)}${exchangeRate.toFixed(4)}`}</div> 

}
