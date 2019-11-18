const React = require('react')
const {useContext, useEffect} = React
const { useHistory, useParams } = require('react-router-dom')
const findIndex_ = require('lodash/findIndex')
const ExchangeWalletSlider = require('./components/exchangeWalletSlider/exchangeWalletSlider.jsx')
const ExchangeRate = require('./exchangeRate.jsx')
const {updateExchangeRates} = require('./actions')
const startExchangeRateSync = require('./startExchangeRateSync')
const {
  storeContext,
  selectors: {getAllWallets, getExchangeRateForPair}
} = require('./store')

module.exports = () => {
  const {state, dispatch} = useContext(storeContext)
  const wallets = getAllWallets(state)
  const { currency } = useParams();
  const history = useHistory()
  const fromWalletIndex = findIndex_(wallets, ['currency', currency])
  const toWalletIndex = fromWalletIndex + 1
  const toWalletCurrency = wallets[toWalletIndex].currency
  const exchangeRate = getExchangeRateForPair(state, currency, toWalletCurrency)

  const updateExchangeRateOnSync = newRates => dispatch(updateExchangeRates(newRates))
  useEffect(() => startExchangeRateSync(updateExchangeRateOnSync), [])

  return <div data-hook="exchange-screen">
    <button data-hook="cancel-button" onClick={() => history.push('/')}>Cancel</button>
    {
      exchangeRate ?
      <ExchangeRate exchangeRate={exchangeRate} fromCurrency={currency} toCurrency={toWalletCurrency}/>:
      null
    }
    <ExchangeWalletSlider wallets={wallets} dataHook="from-wallet" startIndex={fromWalletIndex}/>
    <ExchangeWalletSlider wallets={wallets} dataHook="to-wallet" startIndex={toWalletIndex}/>
  </div> 
}

