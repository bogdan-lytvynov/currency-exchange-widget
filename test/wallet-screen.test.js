require('./prepareEnvironment')
const render = require('../src/render.jsx')
const createWalletScreenDriver = require('./driver/walletScreenDriver')
const walletApiTestkit = require('./walletApiTestkit')
const eventually = require('./eventually')
const {currency} = require('./constants')

const setup = async ({wallets}) => {
  walletApiTestkit.createWallets(wallets)
  render(document.getElementById('mount-point'))

  const driver = createWalletScreenDriver(document.getElementById('mount-point'))
  await driver.waitForUiToLoad()

  return driver
}

describe('main screen', () => {
  describe('slider with currencies', () => {
    it('should show right amount of wallets', async () => {
      const walletScreenDriver = await setup({
        wallets: [
          {
            currency: 'USD',
            balance: 2,
            history: []
          },
          {
            currency: 'GBP',
            balance: 1,
            history: []
          }
        ]
      })
      
      expect(walletScreenDriver.amountOfWallets).toBe(2)
      expect(walletScreenDriver.amountOfBreadcrumbs).toBe(2)
    })

    it('should show round balance in the wallet', async () => {
      const walletScreenDriver = await setup({
        wallets: [
          {
            currency: 'USD',
            balance: 2.22122,
            history: []
          },
          {
            currency: 'GBP',
            balance: 1,
            history: []
          }
        ]
      })
      
      await eventually(() => expect(walletScreenDriver.balance).toBe('$2.22'))
    })

    it('should show next currency on swipe', async () => {
      const walletScreenDriver = await setup({
        wallets: [
          {
            currency: 'USD',
            balance: 2,
            history: []
          },
          {
            currency: 'GBP',
            balance: 1,
            history: []
          }
        ]
      })
      
      await eventually(() => expect(walletScreenDriver.balance).toBe('$2.00'))
      walletScreenDriver.selectNextWallet()
      await eventually(() => expect(walletScreenDriver.balance).toBe('£1.00'))
    })

    it('should show history', async () => {
      const transactionDate = new Date(746841601000)
      const walletScreenDriver = await setup({
        wallets: [
          {
            currency: 'USD',
            balance: 30,
            history: [
              {
                type: 'withdraw',
                toCurrency: 'EUR',
                amount: 20,
                amountInForeignCurrency: 10,
                timestamp: transactionDate.getTime()
              },
              {
                type: 'top-up',
                fromCurrency: 'GBP',
                amount: 10,
                amountInForeignCurrency: 8,
                timestamp: transactionDate.getTime()
              }
            ]
          }
        ]
      })
      
      expect(walletScreenDriver.history.getRecords()).toEqual([
        {
          date: 'Wed Sep 01 1993',
          description: 'Exchanged to EUR',
          amount: '$20',
          amountInForeignCurrency: '€10'
        },
        {
          date: 'Wed Sep 01 1993',
          description: 'Exchanged from GBP',
          amount: '$10',
          amountInForeignCurrency: '£8'
        }
      ])
    })

    it('should change history when switching to another wallet', async () => {
      const transactionDate = new Date(746841601000)
      const walletScreenDriver = await setup({
        wallets: [
          {
            currency: 'USD',
            balance: 30,
            history: [
              {
                type: 'withdraw',
                toCurrency: 'EUR',
                amount: 20,
                amountInForeignCurrency: 10,
                timestamp: transactionDate.getTime()
              }
            ]
          },
          {
            currency: 'EUR',
            balance: 10,
            history: [
              {
                type: 'withdraw',
                toCurrency: 'GBP',
                amount: 2,
                amountInForeignCurrency: 1,
                timestamp: transactionDate.getTime()
              }
            ]
          }
        ]
      })
      
      //history for dollar wallet
      expect(walletScreenDriver.history.getRecords()).toEqual([
        {
          date: 'Wed Sep 01 1993',
          description: 'Exchanged to EUR',
          amount: '$20',
          amountInForeignCurrency: '€10'
        }
      ])

      //select euro wallet
      walletScreenDriver.selectNextWallet()

      await eventually(() => {
        //history for euro wallet
        expect(walletScreenDriver.history.getRecords()).toEqual([
          {
            date: 'Wed Sep 01 1993',
            description: 'Exchanged to GBP',
            amount: '€2',
            amountInForeignCurrency: '£1'
          }
        ])
      }
      )
    })
  })
})
