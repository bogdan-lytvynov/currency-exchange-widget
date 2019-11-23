const zipObject_ = require('lodash/zipObject')

const getExchangeRatesForBase = async base => {
  const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
  const {rates} = await response.json() 

  return rates
}

const currencyList = ['USD', 'EUR', 'GBP']
const getExchangeRates = async () => {
  //TODO: use api that returns exchange rate for all currencies in one request
  const currencyRates = await Promise.all(currencyList.map(getExchangeRatesForBase))
  return zipObject_(currencyList, currencyRates)
}
module.exports = onExcahngeRateUpdate => {
  getExchangeRates().then(firstSyncResult => onExcahngeRateUpdate(firstSyncResult))

  const intervalId = setInterval(async () => {
    const syncResult = await getExchangeRates()
    onExcahngeRateUpdate(syncResult)
  }, 1000)

  return () => clearInterval(intervalId)
}
