require('./prepareEnvironment')
const render = require('../src/render.jsx')
const createWalletScreenDriver = require('./driver/walletScreenDriver')
const createExchangeScreenDriver = require('./driver/exchangeScreenDriver')
const eventually = require('./eventually')
const walletApiTestkit = require('./walletApiTestkit')
const {currency} = require('./constants')
const createExchangeRatesTestkit = require('./exchangeRatesTestkit')
const { createBrowserHistory } = require('history');


describe('Exchange screen', () => {
  const exchangeRatesTestkit = createExchangeRatesTestkit()
  const history = createBrowserHistory()

  const setupWalletAndClickExchange = async ({wallets}) => {
    walletApiTestkit.createWallets(wallets)
    render(document.getElementById('mount-point'), history)

    const walletDriver = createWalletScreenDriver(document.getElementById('mount-point'))
    await walletDriver.waitForUiToLoad()

    walletDriver.clickExchangeButton()

    const exchangeScreenDriver = createExchangeScreenDriver(document.getElementById('mount-point'))
    await exchangeScreenDriver.waitForUiToLoad()

    return {exchangeScreenDriver, walletDriver}
  }

  beforeAll(() => {
    exchangeRatesTestkit.startIntercepting()
  })
  
  afterAll(() => {
    exchangeRatesTestkit.stopIntercepting()
  })

  beforeEach(() => {
    history.push('/')
  })

  afterEach(() => exchangeRatesTestkit.reset())

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

    await eventually(() => {
      expect(walletDriver.balance).toBe('10')
      expect(walletDriver.currency).toBe('USD')
      expect(walletDriver.history.getRecords()).toEqual([])
    })
  })

  it('should show default pair of wallets: from selected wallet to USD', async () => {
    const {exchangeScreenDriver} = await setupWalletAndClickExchange({
      wallets: [
        {
          balance: 15,
          currency: 'GBP',
          history: []
        },
        {
          balance: 10,
          currency: 'EUR',
          history: []
        },
        {
          balance: 1,
          currency: 'USD',
          history: []
        },
      ]
    })

    await eventually(() => {
      expect(exchangeScreenDriver.fromWallet.currency).toBe('GBP')
      expect(exchangeScreenDriver.fromWallet.balance).toBe('You have £15')

      expect(exchangeScreenDriver.toWallet.currency).toBe('USD')
      expect(exchangeScreenDriver.toWallet.balance).toBe('You have $1')
    })
  })

  it('should set default to wallet to EUR if exchanging USD',async () => {
    const {exchangeScreenDriver} = await setupWalletAndClickExchange({
      wallets: [
        {
          balance: 10,
          currency: 'USD',
          history: []
        },
        {
          balance: 15,
          currency: 'GBP',
          history: []
        },
        {
          balance: 1,
          currency: 'EUR',
          history: []
        },
      ]
    })

    await eventually(() => {
      expect(exchangeScreenDriver.fromWallet.currency).toBe('USD')
      expect(exchangeScreenDriver.fromWallet.balance).toBe('You have $10')

      expect(exchangeScreenDriver.toWallet.currency).toBe('EUR')
      expect(exchangeScreenDriver.toWallet.balance).toBe('You have €1')
    })
  })

  describe('exchange rate', () => {
    it('should show exchange rate for choosed pair of wallets', async () => {
      exchangeRatesTestkit.setRatesForBase('USD', {
        'EUR': 0.91321,
        'GBP': 0.7
      })

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

      await eventually(() => 
        expect(exchangeScreenDriver.exchangeRate).toBe('$1=€0.9132')
      )

      exchangeRatesTestkit.setRatesForBase('USD', {
        'EUR': 0.53425,
        'GBP': 0.7
      })

      await eventually(() => 
        expect(exchangeScreenDriver.exchangeRate).toBe('$1=€0.5343')
      )
    })

    it('should show correct exchange rate when change wallet', async () => {
      exchangeRatesTestkit.setRatesForBase('USD', {
        'EUR': 0.91321,
        'GBP': 0.7
      })

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

      await eventually(() => 
        expect(exchangeScreenDriver.exchangeRate).toBe('$1=€0.9132')
      )

      exchangeRatesTestkit.setRatesForBase('EUR', {
        'EUR': 1,
        'USD': 1.1,
        'GBP': 0.85
      })

      //select EUR
      exchangeScreenDriver.fromWallet.selectNextWallet()
      await eventually(() => 
        expect(exchangeScreenDriver.exchangeRate).toBe('€1=€1.0000')
      )

      //select GBP
      exchangeScreenDriver.toWallet.selectNextWallet()

      await eventually(() => {
        expect(exchangeScreenDriver.exchangeRate).toBe('€1=£0.8500')
      })
    })

  })

  describe('money exchange', () => {
    it('should show result of exchange during the exchange rate update', async () => {
      exchangeRatesTestkit.setRatesForBase('GBP', {
        'USD': 0.7,
        'EUR': 0.91321
      })

      const {exchangeScreenDriver} = await setupWalletAndClickExchange({
        wallets: [
          {
            balance: 15,
            currency: 'GBP',
            history: []
          },
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

      await eventually(() => {
        exchangeScreenDriver.fromWallet.enterAmoutForExchange(1)
      })

      await eventually(() => {
        expect(exchangeScreenDriver.toWallet.exchangeResult).toBe('0.7000')
        expect(exchangeScreenDriver.toWallet.inversExchangeRate).toBe('$1=£1.4286')
      })

      exchangeRatesTestkit.setRatesForBase('GBP', {
        'USD': 0.8501,
        'EUR': 1
      })

      await eventually(() => {
        expect(exchangeScreenDriver.toWallet.exchangeResult).toBe('0.8501')
        expect(exchangeScreenDriver.toWallet.inversExchangeRate).toBe('$1=£1.1763')
      })
    })

    it('should show result of excahnge for another wallet when it is selected', async () => {
      exchangeRatesTestkit.setRatesForBase('USD', {
        'EUR': 0.9,
        'GBP': 0.7
      })

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
        exchangeScreenDriver.fromWallet.enterAmoutForExchange(1)
      })

      await eventually(() => {
        expect(exchangeScreenDriver.toWallet.exchangeResult).toBe('0.9000')
        expect(exchangeScreenDriver.toWallet.inversExchangeRate).toBe('€1=$1.1111')
      })

      //select GBP
      exchangeScreenDriver.toWallet.selectNextWallet()

      await eventually(() => {
        expect(exchangeScreenDriver.toWallet.exchangeResult).toBe('0.7000')
        expect(exchangeScreenDriver.toWallet.inversExchangeRate).toBe('£1=$1.4286')
      })
    })


    describe('', () => {
      const originalDate = Date
      const transactionDate = new Date('Wed Sep 01 1993')

      //beforeEach(() => {
      //  Date = class extends Date {
      //    constructor() {
      //      return transactionDate
      //    }

      //  }
      //})

      //afterEach(() => {
      //  Date = originalDate
      //})

      it('should exchange money and update history', async () => {
        exchangeRatesTestkit.setRatesForBase('USD', {
          'EUR': 0.5,
          'GBP': 0.7
        })

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
            },
            {
              balance: 15,
              currency: 'GBP',
              history: []
            }
          ]
        })


        await eventually(() => {
          exchangeScreenDriver.fromWallet.enterAmoutForExchange(2)
          exchangeScreenDriver.clickExchangeButton()
        })

        //wait for navigation to wallet page
        await walletDriver.waitForUiToLoad()

        await eventually(() => {
          expect(walletDriver.currency).toBe('USD')
          expect(walletDriver.balance).toBe('8')

          expect(walletDriver.history.getRecords()).toEqual([
            {
              date: new Date().toDateString(),
              description: 'Exchanged to EUR',
              amount: '$2',
              amountInForeignCurrency: '€1'
            }
          ])
        })

        await walletDriver.selectNextWallet()
        await eventually(() => {
          expect(walletDriver.currency).toBe('EUR')
          expect(walletDriver.balance).toBe('2')

          expect(walletDriver.history.getRecords()).toEqual([
            {
              date: new Date().toDateString(),
              description: 'Exchanged from USD',
              amount: '€1',
              amountInForeignCurrency: '$2'
            }
          ])
        })
      })
    })
  })
})
