const React = require('react')
const Exchange = require('./exchange.jsx')
const { Redirect, useParams, useHistory } = require('react-router-dom')
const WaitForWalletsToLoad = require('../waitForWalletsToLoad.jsx')
const routes = require('../routes')

module.exports = () => {
  const { from, to } = useParams();
  const history = useHistory()

  return <WaitForWalletsToLoad>
    {
      to ?
      <Exchange from={from} to={to}/> :
      <Redirect push to={routes.exchange.toPath({from, to: from === 'USD' ? 'EUR' : 'USD'})}/>
    }
  </WaitForWalletsToLoad>
}
