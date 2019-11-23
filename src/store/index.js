const {createStore, applyMiddleware} = require('redux')
const thunk = require('redux-thunk').default
const reducer = require('./reducer')
const walletsAPI = require('../walletsAPI')

exports.selectors = require('./selectors')
exports.createStore = ({history}) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument({history, walletsAPI})))
}
exports.actions = require('./actions')
