const ReactDOM = require('react-dom')
const React = require('react')
const App = require('./app.jsx')
const {StoreProvider, storeContext} = require('./store')

module.exports = container => {
  ReactDOM.render(
    <StoreProvider>
      <App/>
    </StoreProvider>,
    container)
}
