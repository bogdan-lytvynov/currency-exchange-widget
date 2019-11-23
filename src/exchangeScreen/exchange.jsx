const React = require('react')
const {useContext, useEffect} = React
const { useHistory, useParams } = require('react-router-dom')
const {useSelector, useDispatch} = require('react-redux')
const findIndex_ = require('lodash/findIndex')
const ExchangeWalletSlider = require('../components/exchangeWalletSlider/exchangeWalletSlider.jsx')
const InverseExchangeRate = require('../components/inverseExchangeRate/inverseExchangeRate.jsx')
const ExchangeRate = require('../components/exchangeRate/exchangeRate.jsx')
const startExchangeRateSync = require('./startExchangeRateSync')
const {
  selectors: {
    getAllWallets,
    getExchangeRateForPair,
    getExchangeRate,
    getAmountForExchange
  },
  actions: {
    updateExchangeRates,
    changeFromWalletIndex,
    changeFromWallet,
    changeToWallet,
    enterAmountForExchange,
    exchange
  }
} = require('../store')

module.exports = ({from, to}) => {
  const wallets = useSelector(getAllWallets)
  const dispatch = useDispatch()
  const history = useHistory()
  const exchangeRate = useSelector(getExchangeRate(from, to))
  const fromWalletIndex = findIndex_(wallets, ['currency', from])
  const toWalletIndex = findIndex_(wallets, ['currency', to])
  const amountForExchange = useSelector(getAmountForExchange)

  const updateExchangeRateOnSync = newRates => dispatch(updateExchangeRates(newRates))
  useEffect(() => startExchangeRateSync(updateExchangeRateOnSync), [])
  const onKeyDownAmoutToExchange = ({target: {value}}) => dispatch(enterAmountForExchange(value))
  const exchangeOnClick = () => dispatch(exchange({amountForExchange, exchangeRate, from, to}))

  return <div data-hook="exchange" className="exchange">
    <button className="exchange__cancel-button" data-hook="cancel-button" onClick={() => history.push('/')}>Cancel</button>
    <button className="exchange__exchange-button" data-hook="exchange-button" onClick={exchangeOnClick}>Exchange</button>
    {
      exchangeRate ?
      <ExchangeRate exchangeRate={exchangeRate} fromCurrency={from} toCurrency={to} dataHook="exchange-rate"/>:
      null
    }
    <ExchangeWalletSlider
      wallets={wallets}
      dataHook="from-wallet"
      startIndex={fromWalletIndex}
      onChangeWallet={walletIndex => {
        dispatch(changeFromWallet(walletIndex))
      }}
    >
      <input type="number" data-hook="amount-to-exchange-input" onKeyDown={onKeyDownAmoutToExchange}/>
    </ExchangeWalletSlider>

    <ExchangeWalletSlider
      wallets={wallets}
      dataHook="to-wallet"
      startIndex={toWalletIndex}
      onChangeWallet={toWalletIndex => {
        dispatch(changeToWallet(toWalletIndex))
      }}
    >
      <div data-hook="exchange-result">{(amountForExchange * exchangeRate).toFixed(4)}</div>
      <InverseExchangeRate exchangeRate={exchangeRate} from={from} to={to}/>
    </ExchangeWalletSlider>
  </div> 
}

