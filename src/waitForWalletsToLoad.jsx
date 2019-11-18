const React = require('react')
const {useContext, useEffect} = React
const {
  storeContext,
  selectors: {getAllWallets, getExchangeRateForPair}
} = require('./store')

module.exports = ({children}) => {
  const {state, dispatch} = useContext(storeContext)
  const wallets = getAllWallets(state)
  const hasWallets = wallets.length > 0

  return hasWallets ? <> {children} </> : null
}
