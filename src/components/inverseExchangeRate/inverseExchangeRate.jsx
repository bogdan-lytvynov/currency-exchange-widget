const React = require('react')
const getCurrencySymbol = require('../../getCurrencySymbol')

module.exports = ({exchangeRate, from, to}) => {
  const inverseExchangeRate = (1 / exchangeRate).toFixed(4)
  return (
      <div data-hook="invers-exchange-rate">
        {`${getCurrencySymbol(to)}1=${getCurrencySymbol(from)}${inverseExchangeRate}`}
      </div>
      )
}
