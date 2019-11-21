require('./prepareEnvironment')
const render = require('../src/render.jsx')
const createWalletScreenDriver = require('./driver/walletScreenDriver')
const eventually = require('./eventually')
const walletApiTestkit = require('./walletApiTestkit')
const {currency} = require('./constants')

const setup = async ({wallets}) => {
  walletApiTestkit.createWallets(wallets)
  render(document.getElementById('mount-point'))

  const driver = createWalletScreenDriver(document.getElementById('mount-point'))
  await driver.waitForUiToLoad()

  return driver
}

describe('main screen', () => {
  describe.only('slider with currencies', () => {
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
      
      await eventually(() => expect(walletScreenDriver.balance).toBe('2'))
      walletScreenDriver.selectNextWallet()
      await eventually(() => expect(walletScreenDriver.balance).toBe('1'))
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
                type: 'exchange',
                fromCurrency: 'EUR',
                amount: 20,
                amountInForeignCurrency: 10,
                timestamp: transactionDate.getTime()
              },
              {
                type: 'top-up',
                amount: 10,
                timestamp: transactionDate.getTime()
              }
            ]
          }
        ]
      })
      
      expect(walletScreenDriver.history.getRecords()).toEqual([
        {
          date: 'Wed Sep 01 1993',
          description: 'Exchanged from EUR',
          amount: '$20',
          //amountOfForeignCurrency: '€10'
        },
        {
          date: 'Wed Sep 01 1993',
          description: 'Top up',
          amount: '$10'
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
                type: 'exchange',
                fromCurrency: 'EUR',
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
                type: 'top-up',
                amount: 10,
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
          description: 'Exchanged from EUR',
          amount: '$20',
          //amountOfForeignCurrency: '€10'
        }
      ])

      //select euro wallet
      walletScreenDriver.selectNextWallet()

      await eventually(() => {
        //history for euro wallet
        expect(walletScreenDriver.history.getRecords()).toEqual([
          {
            date: 'Wed Sep 01 1993',
            description: 'Top up',
            amount: '€10'
          }
        ])
      }
      )
    })
  })
})
