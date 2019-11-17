const React = require('react')
const {useContext} = React
const { useHistory, useParams } = require('react-router-dom')
const findIndex_ = require('lodash/findIndex')
const ExchangeWalletSlider = require('./components/exchangeWalletSlider/exchangeWalletSlider.jsx')
const {
  storeContext,
  selectors: {getAllWallets}
} = require('./store')

module.exports = () => {
  const {state, dispatch} = useContext(storeContext)
  const wallets = getAllWallets(state)
  const history = useHistory()
  const { currency } = useParams();
  const fromWalletIndex = findIndex_(wallets, ['currency', currency])
  const toWalletIndex = fromWalletIndex + 1
  const hasWallets = wallets.length > 0

  return <div data-hook="exchange-screen">
    <button data-hook="cancel-button" onClick={() => history.push('/')}>Cancel</button>
    {
      hasWallets ? (
      <>
        <ExchangeWalletSlider wallets={wallets} dataHook="from-wallet" startIndex={fromWalletIndex}/>
        <ExchangeWalletSlider wallets={wallets} dataHook="to-wallet" startIndex={toWalletIndex}/>
      </>
      ) : null
    }
  </div> 
}
