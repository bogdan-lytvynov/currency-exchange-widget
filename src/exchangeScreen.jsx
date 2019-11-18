const React = require('react')
const {useContext, useEffect} = React
const Exchange = require('./exchange.jsx')
const WaitForWalletsToLoad = require('./waitForWalletsToLoad.jsx')
const {
  storeContext,
  selectors: {getAllWallets, getExchangeRateForPair}
} = require('./store')

module.exports = () => {
  const {state, dispatch} = useContext(storeContext)
  const wallets = getAllWallets(state)
  const hasWallets = wallets.length > 0

  return <WaitForWalletsToLoad> <Exchange/> </WaitForWalletsToLoad>
}
