require('./wallets.css')
const React = require('react')
const {useSelector, useDispatch} = require('react-redux')
const { useHistory } = require('react-router-dom')
const {
  selectors: {getAllWallets, getWalletHistory, getWalletCurrency},
  actions: {changeWallet}
} = require('../store')
const ExchangeButton = require('../components/exchangeButton/exchangeButton.jsx')
const History = require('../components/history/history.jsx')
const {Slider, Slide} = require('../components/slider')
const getCurrencySymbol = require('../getCurrencySymbol')

module.exports = () => {
  const wallets = useSelector(getAllWallets)
  const walletCurrency = useSelector(getWalletCurrency)
  const history = useHistory()
  const walletHistory = useSelector(getWalletHistory)
  const dispatch = useDispatch()
  const goToExchangeScreen = () => history.push(`/exchange/${walletCurrency}`)
  const onChangeSlide = (index) => dispatch(changeWallet(index))

  return (
    <div className="wallets" data-hook="wallets">
      <Slider loop={true} 
      className="wallet__slider"
      dataHook="wallets-slider"
      onChangeSlide={onChangeSlide}>{
        wallets.map(({balance, currency}) => <Slide key={currency}>
          <div className="wallet__balance" data-hook="balance">{`${getCurrencySymbol(currency)}${balance.toFixed(2)}`}</div>
          <div data-hook="currency">{currency}</div>
        </Slide>
        )
      }
      </Slider>
      <ExchangeButton dataHook="exchange-button" className="wallet__exchange-button" onClick={goToExchangeScreen}/>
      <History history={walletHistory} walletCurrency={walletCurrency}/>
    </div>
  )
}
