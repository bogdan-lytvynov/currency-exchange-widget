const React = require('react')
const {useEffect, useContext} = React
const {Slider, Slide} = require('./components/slider')
const History = require('./components/history/history.jsx')
const {
  storeContext,
  selectors: {getAllWallets, getWalletHistory, getWalletCurrency}
} = require('./store')
const {loadWallets, changeWallet} = require('./actions')

module.exports = () => {
  const {state, dispatch} = useContext(storeContext)

  useEffect(() => {
    const walltesAreNotLoaded = getAllWallets(state).length === 0
    if (walltesAreNotLoaded) {
      loadWallets(dispatch)
    }
  })

  return (<div>
  <div style={{width: '300px', border: '1px solid black', height: '200px'}} data-hook="wallet">
  <Slider loop={true} dataHook="wallets-slider" onChangeSlide={(index) => dispatch(changeWallet(index))}>{
    getAllWallets(state).map(({balance, currency}) => <Slide key={currency}>
      <div data-hook="balance">{balance}</div>
      <div data-hook="currency">{currency}</div>
    </Slide>
    )
  }
  </Slider>
  <History history={getWalletHistory(state)} walletCurrency={getWalletCurrency(state)}/>
  </div>
  </div>)
}
