const ReactDOM = require('react-dom')
const React = require('react')
const App = require('./app.jsx')

module.exports = container => {
  ReactDOM.render(<App/>, container)
}
