module.exports = (currency) => {
  const currencySymbolsMap = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  }

  return currencySymbolsMap[currency]
}
