const React = require('react')
const {useReducer} = React
const storeContext = require('./storeContext')
const reducer = require('./reducer')

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, reducer.initialState)
  const value = {state, dispatch}

  return <storeContext.Provider value={value}>{children}</storeContext.Provider> 
}
module.exports = StoreProvider
