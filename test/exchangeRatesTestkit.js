const nock = require('nock')
const querystring = require('querystring');
module.exports = () => {

  let rates = {
    USD: {
      EUR: 1,
      GBP: 1,
      USD: 1
    },
    EUR: {
      EUR: 1,
      GBP: 1,
      USD: 1
    },
    GBP: {
      EUR: 1,
      GBP: 1,
      USD: 1
    },
  }
  return {
    setRatesForBase(base, _rates) {
      rates[base] = _rates
    },
    startIntercepting() {
      nock('https://api.exchangeratesapi.io')
        .persist()
        .get(/^\/latest/)
        .reply(200, function () {
          const {base} = querystring.parse(this.req.options.query)
          return {rates: rates[base]}
        })
    },
    stopInterecprint() {
      nock.clearAll()
    }
  }
}
