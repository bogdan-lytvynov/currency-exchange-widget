require('./history.css')
const React = require('react')
const WithdrawItem = require('./withdrawItem.jsx')
const TopUpItem = require('./topUpItem.jsx')

const itemViewMap = {
  withdraw: WithdrawItem,
  'top-up': TopUpItem
}

module.exports = ({history, walletCurrency}) => (
  <div className="history" data-hook="history">
  {
    history.map((item, index) => {
      const Item = itemViewMap[item.type] 
      return <Item {...item} key={index} walletCurrency={walletCurrency}/>
    })
  }
  </div>
)
