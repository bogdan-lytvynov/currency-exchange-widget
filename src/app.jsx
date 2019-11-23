const React = require('react')
const {useEffect, useContext} = React
const {useSelector, useDispatch} = require('react-redux')
const {
  Route,
  Switch,
  Redirect
} = require('react-router-dom');
const { Router } = require('react-router')
const WalletsScreen = require('./walletsScreen/walletsScreen.jsx')
const ExchangeScreen = require('./exchangeScreen/exchangeScreen.jsx')
const {
  selectors: {getAllWallets, getWalletHistory, getWalletCurrency},
  actions: {
    loadWallets
  }
} = require('./store')

module.exports = ({history}) => {
  const wallets = useSelector(getAllWallets)
  const dispatch = useDispatch()
  useEffect(() => {
    const walletsAreNotLoaded = wallets.length === 0
    if (walletsAreNotLoaded) {
      dispatch(loadWallets())
    }
  }, [])
  return <Router history={history}> 
    <Switch>
      <Redirect exact from="/" to="/wallet/USD"/>
      <Route exact path="/wallet/:currency">
        <WalletsScreen/>
      </Route>
  
      <Route path="/exchange/:from/:to?">
        <ExchangeScreen/>
      </Route>
    </Switch>
  </Router>
}
