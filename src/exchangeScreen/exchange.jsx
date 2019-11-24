require('./exchange.css')
const React = require('react')
const {useContext, useEffect} = React
const { useHistory, useParams } = require('react-router-dom')
const {useSelector, useDispatch} = require('react-redux')
const findIndex_ = require('lodash/findIndex')
const ExchangeWalletSlider = require('../components/exchangeWalletSlider/exchangeWalletSlider.jsx')
const InverseExchangeRate = require('../components/inverseExchangeRate/inverseExchangeRate.jsx')
const ExchangeRate = require('../components/exchangeRate/exchangeRate.jsx')
const InputOutput = require('../components/inputOutput/inputOutput.jsx')
const startExchangeRateSync = require('./startExchangeRateSync')
const {
  selectors: {
    getAllWallets,
    getExchangeRateForPair,
    getExchangeRate,
    getAmountForExchange,
    getDesiredExchangeAmount
  },
  actions: {
    updateExchangeRates,
    changeFromWalletIndex,
    changeFromWallet,
    changeToWallet,
    enterAmountForExchange,
    exchange,
    enterExpectedExchangeResult
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
  const desiredExchangeAmount = useSelector(getDesiredExchangeAmount)

  const updateExchangeRateOnSync = newRates => dispatch(updateExchangeRates(newRates))
  useEffect(() => startExchangeRateSync(updateExchangeRateOnSync), [])
  const onChangeAmoutForExchange = value => dispatch(enterAmountForExchange(value))
  const exchangeOnClick = () => dispatch(exchange({amountForExchange, exchangeRate, from, to}))
  const onChangeOutput = value => dispatch(enterExpectedExchangeResult(value))
  const amountForExcahnge = desiredExchangeAmount / exchangeRate
  const exchangeResult = amountForExchange * exchangeRate

  return <div data-hook="exchange" className="exchange">
    <button className="exchange__cancel-button" data-hook="cancel-button" onClick={() => history.push('/')}>Cancel</button>
    {
      exchangeRate ?
      <ExchangeRate exchangeRate={exchangeRate} fromCurrency={from} toCurrency={to} dataHook="exchange-rate" className="exchange__exchange-rate"/>:
      null
    }
    <button className="exchange__exchange-button" data-hook="exchange-button" onClick={exchangeOnClick}>Exchange</button>
    <ExchangeWalletSlider
      className="exchange__from"
      wallets={wallets}
      dataHook="from-wallet"
      startIndex={fromWalletIndex}
      onChangeWallet={walletIndex => {
        dispatch(changeFromWallet(walletIndex))
      }}
    >
      <InputOutput dataHook="amount-to-exchange-input" onType={onChangeAmoutForExchange} value={amountForExcahnge} autofocus={true}/>
    </ExchangeWalletSlider>

    <ExchangeWalletSlider
      className="exchange__to"
      wallets={wallets}
      dataHook="to-wallet"
      startIndex={toWalletIndex}
      onChangeWallet={toWalletIndex => {
        dispatch(changeToWallet(toWalletIndex))
      }}
    >
      <InputOutput dataHook="exchange-result" onType={onChangeOutput} value={exchangeResult} />
      <InverseExchangeRate exchangeRate={exchangeRate} from={from} to={to}/>
    </ExchangeWalletSlider>
  </div> 
}

