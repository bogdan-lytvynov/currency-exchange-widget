require('./prepareEnvironment')
const render = require('../src/render.jsx')
const createWalletScreenDriver = require('./driver/walletScreenDriver')
const eventually = require('wix-eventually')

const setup = async () => {
  render(document.getElementById('mount-point'))

  const driver = createWalletScreenDriver(document.getElementById('mount-point'))
  await driver.waitForUiToLoad()

  return driver
}


describe('main screen', () => {
  describe('slider with currencies', () => {
    it('should show next currency on swipe', async () => {
      const walletScreenDriver = await setup()
      
      expect(walletScreenDriver.balance).toBe('100')
      walletScreenDriver.selectNextWallet()
      await eventually(() => {
        expect(walletScreenDriver.balance).toBe('150')
      })
    })
  })
})
