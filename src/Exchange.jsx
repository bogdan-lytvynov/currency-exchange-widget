const React = require('react')
const {useContext, useEffect} = React
const { useHistory, useParams } = require('react-router-dom')
const {useSelector, useDispatch} = require('react-redux')
const findIndex_ = require('lodash/findIndex')
const ExchangeWalletSlider = require('./components/exchangeWalletSlider/exchangeWalletSlider.jsx')
const ExchangeRate = require('./exchangeRate.jsx')
const {
  updateExchangeRates,
  changeFromWalletIndex,
  changeFromWallet,
  changeToWallet
} = require('./actions')
const startExchangeRateSync = require('./startExchangeRateSync')
const {
  storeContext,
  selectors: {getAllWallets, getExchangeRateForPair, getExchangeRate}
} = require('./store')

module.exports = ({from, to}) => {
  const wallets = useSelector(getAllWallets)
  const dispatch = useDispatch()
  const history = useHistory()
  const exchangeRate = useSelector(getExchangeRate(from, to))
  const fromWalletIndex = findIndex_(wallets, ['currency', from])
  const toWalletIndex = findIndex_(wallets, ['currency', to])

  const updateExchangeRateOnSync = newRates => dispatch(updateExchangeRates(newRates))
  useEffect(() => startExchangeRateSync(updateExchangeRateOnSync), [])

  return <div data-hook="exchange-screen">
    <button data-hook="cancel-button" onClick={() => history.push('/')}>Cancel</button>
    {
      exchangeRate ?
      <ExchangeRate exchangeRate={exchangeRate} fromCurrency={from} toCurrency={to}/>:
      null
    }
    <ExchangeWalletSlider 
      wallets={wallets}
      dataHook="from-wallet"
      startIndex={fromWalletIndex}
      onChangeWallet={walletIndex => {
        dispatch(changeFromWallet(walletIndex))
      }}
    />

    <ExchangeWalletSlider
      wallets={wallets}
      dataHook="to-wallet"
      startIndex={toWalletIndex}
      onChangeWallet={toWalletIndex => {
        dispatch(changeToWallet(toWalletIndex))
      }}
    />
  </div> 
}

