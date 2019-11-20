const ReactDOM = require('react-dom')
const React = require('react')
const App = require('./app.jsx')
const { Provider } = require('react-redux')
const {createStore} = require('./store')
const { createBrowserHistory } = require('history');
const history = createBrowserHistory();

module.exports = container => {
  ReactDOM.render(
    <Provider store={createStore({history})}>
      <App history={history}/>
    </Provider>,
    container)
}
