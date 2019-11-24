const React = require('react')
const { useParams } = require('react-router-dom')
const Wallets = require('./wallets.jsx')
const WaitForWalletsToLoad = require('../waitForWalletsToLoad.jsx')

module.exports = () => {
  const { currency } = useParams();
  return (
  <WaitForWalletsToLoad>
    <Wallets currency={currency}/>
  </WaitForWalletsToLoad>
  )
}
