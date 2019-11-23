const React = require('react')
const {useSelector, useDispatch} = require('react-redux')
const {
  selectors: {getAllWallets}
} = require('./store')

module.exports = ({children}) => {
  const wallets = useSelector(getAllWallets)
  const hasWallets = wallets.length > 0

  return hasWallets ? <> {children} </> : null
}
