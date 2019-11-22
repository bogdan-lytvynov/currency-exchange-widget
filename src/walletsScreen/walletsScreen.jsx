const React = require('react')
const Wallets = require('./wallets.jsx')
const WaitForWalletsToLoad = require('../waitForWalletsToLoad.jsx')

module.exports = () => (
  <WaitForWalletsToLoad>
    <Wallets/>
  </WaitForWalletsToLoad>
)
