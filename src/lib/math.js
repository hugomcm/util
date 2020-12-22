const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

// NUMBER -> NUMBER -> NUMBER
const roundA = dp => val => Math.round(val * Math.pow(10, dp)) / Math.pow(10, dp)
const round = roundA(5)
const roundCurrency = roundA(2)
const roundCurrencyPL = roundA(4)

// NUMBER -> NUMBER
const floor = v => Math.floor(v)

// INT -> STR -> STR
const financialA = dp => val => Number.parseFloat(val).toFixed(dp)
const financial = financialA(5)

module.exports = {
  avg,
  round,
  roundCurrency,
  roundCurrencyPL,
  roundA,
  floor,
  financial,
  financialA,
}
