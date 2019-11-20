const React = require('react')
const {useEffect, useContext} = React
const {useSelector, useDispatch} = require('react-redux')
const {
  Route,
  Switch,
  Redirect
} = require('react-router-dom');
const { Router } = require('react-router')
const WalletsScreen = require('./walletsScreen.jsx')
const ExchangeScreen = require('./exchangeScreen.jsx')
const {
  storeContext,
  selectors: {getAllWallets, getWalletHistory, getWalletCurrency}
} = require('./store')
const {loadWallets} = require('./actions')

module.exports = ({history}) => {
  const wallets = useSelector(getAllWallets)
  const dispatch = useDispatch()
  useEffect(() => {
    const walletsAreNotLoaded = wallets.length === 0
    if (walletsAreNotLoaded) {
      loadWallets(dispatch)
    }
  })
  return <Router history={history}> 
    <Switch>
      <Route exact path="/">
        <WalletsScreen/>
      </Route>
  
      <Route path="/exchange/:from/:to?">
        <ExchangeScreen/>
      </Route>
    </Switch>
  </Router>
}
