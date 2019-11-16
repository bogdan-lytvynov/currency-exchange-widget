const {LOAD_WALLETS, CHANGE_WALLET} = require('../actionTypes')
const merge_ = require('lodash/merge')

const initialState = {
  wallets: [],
  currentWalletIndex: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case LOAD_WALLETS:
      return merge_({}, state, {wallets: action.wallets})
    case CHANGE_WALLET:
      return merge_({}, state, {currentWalletIndex: action.newWalletIndex})
  }
}

reducer.initialState = initialState
module.exports = reducer
