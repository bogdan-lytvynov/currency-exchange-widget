const {createStore, applyMiddleware} = require('redux')
const reducer = require('./reducer')
const thunk = require('redux-thunk').default

exports.selectors = require('./selectors')
exports.createStore = ({history}) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument({history})))
}
