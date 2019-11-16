module.exports = historyElement => ({
  getRecords() {
    return Array.from(historyElement.querySelectorAll('.history__item')).map(itemElement => {
      switch(itemElement.dataset.type) {
        case 'exchange': {
          const date = itemElement.querySelector('.history__item-date').textContent
          const description = itemElement.querySelector('.history__item-description').textContent
          const amount = itemElement.querySelector('.history__item-amount').textContent
          const amountInForeignCurrency = itemElement.querySelector('.history__item-amount-in-foreign-currency').textContent

          return {
            date,
            description,
            amount,
            //amountInForeignCurrency
          }
        }

        case 'top-up': {
          const date = itemElement.querySelector('.history__item-date').textContent
          const description = itemElement.querySelector('.history__item-description').textContent
          const amount = itemElement.querySelector('.history__item-amount').textContent

          return {
            date,
            description,
            amount
          }
        }
      }
    })
  }
})
