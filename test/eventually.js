module.exports = function eventually(
  testFn,
  { timeout = 1500, delay = 5 } = { timeout: 1500, delay: 5 }
) {
  return new Promise((resolve, reject) => {
    test(null, new Date())()

    function test(lastError, startTime) {
      return function testTillResolvesOrTimesOut() {
        try {
          const result = testFn()
          Promise.resolve(result).then(resolve, handleError)
        } catch (e) {
          handleError(e)
        }
      }

      function handleError(e) {
        if (new Date().getTime() - startTime.getTime() >= timeout) {
          reject(e)
        } else {
          setTimeout(test(e, startTime), delay)
        }
      }
    }
  })
}
