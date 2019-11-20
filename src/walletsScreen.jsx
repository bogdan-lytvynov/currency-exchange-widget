const React = require('react')
const {useContext} = React
const {useSelector, useDispatch} = require('react-redux')
const { useHistory } = require('react-router-dom')
const {Slider, Slide} = require('./components/slider')
const History = require('./components/history/history.jsx')
const {
  storeContext,
  selectors: {getAllWallets, getWalletHistory, getWalletCurrency}
} = require('./store')
const {changeWallet} = require('./actions')

module.exports = () => {
  const wallets = useSelector(getAllWallets)
  const walletCurrency = useSelector(getWalletCurrency)
  const hasWallets = wallets.length > 0
  const history = useHistory()
  const walletHistory = useSelector(getWalletHistory)
  const dispatch = useDispatch()

  return (<div style={{width: '300px', border: '1px solid black', height: '200px'}} >{
    hasWallets ? (<div data-hook="wallet">
    <Slider loop={true} dataHook="wallets-slider" onChangeSlide={(index) => dispatch(changeWallet(index))}>{
      wallets.map(({balance, currency}) => <Slide key={currency}>
        <div data-hook="balance">{balance}</div>
        <div data-hook="currency">{currency}</div>
      </Slide>
      )
    }
    </Slider>
    <button data-hook="exchange-button" onClick={() => history.push(`/exchange/${walletCurrency}`)}>
      Exchange 
    </button>
    <History history={walletHistory} walletCurrency={walletCurrency}/>
    </div>) : null
  }
  </div>)
}
