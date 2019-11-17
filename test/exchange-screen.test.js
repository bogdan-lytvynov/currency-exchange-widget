require('./prepareEnvironment')
const render = require('../src/render.jsx')
const createWalletScreenDriver = require('./driver/walletScreenDriver')
const createExchangeScreenDriver = require('./driver/exchangeScreenDriver')
const eventually = require('./eventually')
const walletApiTestkit = require('./walletApiTestkit')
const {currency} = require('./constants')
const createExchangeRatesTestkit = require('./exchangeRatesTestkit')

const setupWalletAndClickExchange = async ({wallets}) => {
  walletApiTestkit.createWallets(wallets)
  render(document.getElementById('mount-point'))

  const walletDriver = createWalletScreenDriver(document.getElementById('mount-point'))
  await walletDriver.waitForUiToLoad()

  walletDriver.clickExchangeButton()

  const exchangeScreenDriver = createExchangeScreenDriver(document.getElementById('mount-point'))
  await exchangeScreenDriver.waitForUiToLoad()

  return {exchangeScreenDriver, walletDriver}
}

describe('Exchange screen', () => {
  const exchangeRatesTestkit = createExchangeRatesTestkit()

  beforeAll(() => {
    exchangeRatesTestkit.startIntercepting()
  })
  
  afterAll(() => {
    exchangeRatesTestkit.stopIntercepting()
  })

  it.skip('should open excahnge screen for the currency of the curreny wallet', async () => {
    const exchangeScreenDriver = await setupWalletAndClickExchange({
      wallets: [
        {
          balance: 10,
          currency: 'EUR',
          history: []
        },
        {
          balance: 1,
          currency: 'EUR',
          history: []
        }
      ]
    })

    expect(exchangeScreenDriver.from.currency).toBe('EUR')
  })

  it('should return back to wallet screen when click on cancel button', async () => {
    const {exchangeScreenDriver, walletDriver} = await setupWalletAndClickExchange({
      wallets: [
        {
          balance: 10,
          currency: 'USD',
          history: []
        },
        {
          balance: 1,
          currency: 'EUR',
          history: []
        }
      ]
    })

    exchangeScreenDriver.clickCancelButton()

    //wait for navigation to wallet page
    await walletDriver.waitForUiToLoad()

    expect(walletDriver.balance).toBe('10')
    expect(walletDriver.currency).toBe('USD')
    expect(walletDriver.history.getRecords()).toEqual([])
  })

  it('should show default pair of wallets: from selected wallet to next wallet from the wallet list', async () => {
    const {exchangeScreenDriver} = await setupWalletAndClickExchange({
      wallets: [
        {
          balance: 10,
          currency: 'USD',
          history: []
        },
        {
          balance: 1,
          currency: 'EUR',
          history: []
        },
        {
          balance: 15,
          currency: 'GBP',
          history: []
        }
      ]
    })

    await eventually(() => {
      expect(exchangeScreenDriver.fromWallet.currency).toBe('USD')
      expect(exchangeScreenDriver.fromWallet.balance).toBe('You have $10')

      expect(exchangeScreenDriver.toWallet.currency).toBe('EUR')
      expect(exchangeScreenDriver.toWallet.balance).toBe('You have €1')
    })
  })

})
