const React = require('react')
const {useEffect, useContext} = React
const {
  BrowserRouter,
  Route,
  Switch
} = require('react-router-dom');
const WalletsScreen = require('./walletsScreen.jsx')
const ExchangeScreen = require('./exchangeScreen.jsx')
const {
  storeContext,
  selectors: {getAllWallets, getWalletHistory, getWalletCurrency}
} = require('./store')
const {loadWallets} = require('./actions')

module.exports = () => {
  const {state, dispatch} = useContext(storeContext)
  useEffect(() => {
    const walltesAreNotLoaded = getAllWallets(state).length === 0
    if (walltesAreNotLoaded) {
      loadWallets(dispatch)
    }
  })
  return <BrowserRouter> 
    <Switch>
      <Route exact path="/">
        <WalletsScreen/>
      </Route>
  
      <Route path="/exchange/:currency">
        <ExchangeScreen/>
      </Route>
    </Switch>
  </BrowserRouter>
}
