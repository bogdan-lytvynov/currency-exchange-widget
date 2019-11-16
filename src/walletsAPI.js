module.exports = {
  getAll() {
    return JSON.parse(localStorage.getItem('wallets'))
  }
}
