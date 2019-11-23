const React = require('react')
const getCurrencySymbol = require('../../getCurrencySymbol')

module.exports = ({exchangeRate, fromCurrency, toCurrency, dataHook}) => {
  return <div data-hook={dataHook}>{`${getCurrencySymbol(fromCurrency)}1=${getCurrencySymbol(toCurrency)}${exchangeRate.toFixed(4)}`}</div> 

}
