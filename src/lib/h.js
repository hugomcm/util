const { R, F, S, $ } = require('./base')

/*** My own generic pointfree functions ***/
const H = {}

H._tap = S.tap

let tapCounter = 1
H.tap = tag => x => {
  console.log(`TAP#${tapCounter}${tag !== undefined ? ` "${tag}"` : ''}:`, x)
  // console.log(`TAP#${tapCounter}:`, S.show(x));
  tapCounter++
  return x
}

H.eitherToFuture = S.either(F.reject)(F.resolve)

H.findIndex = f => xs => xs.findIndex(f)

H.uniqueBy = p => S.reduce(acmXs => x => (H.findIndex(y => p(x, y))(acmXs) > -1 ? acmXs : [...acmXs, x]))([])

H.diff = ps => xs => ys => S.reduce(xs => y => S.filter(x => ps(x, y))(xs))(xs)(ys)

H.distinct = S.reduce(acmXs => x => (acmXs.includes(x) ? acmXs : [...acmXs, x]))([])

H.max = S.reduce(acmXs => x => S.max(acmXs)(x))(-Infinity)

H.min = S.reduce(acmXs => x => S.min(acmXs)(x))(Infinity)

H.seqFutArr = futFn => xs =>
  S.reduce(prevFut => inObj => S.chain(prevFutRes => futFn(inObj, prevFutRes))(prevFut))(F.resolve())(xs)

H.parseJSON = jsonData => {
  // Instruction to test json parse
  // jsonData += ' forcing an error @ end of json data fetched from server';
  try {
    return S.Right(JSON.parse(jsonData))
  } catch (err) {
    return S.Left({ err: err.message })
  }
}

H.putIdOnTop = S.map(x => ({ id: x.id, ...x }))

H.splitLines = S.splitOn('\n')
H.indexOf = c => s => s.indexOf(c)
H.indexOfNl = H.indexOf('\n')
H.slice = (si = 0) => fi => s => s.slice(si, fi)

H.sliceUntilNl = str =>
  S.pipe([
    s => [s, H.indexOfNl(s)],
    ([s, li]) => (li < 0 ? [H.slice()()(s), ''] : [H.slice()(li)(s), H.slice(li + 1)()(s)]),
  ])(str)
// H.sliceUntilNl = s => {
//   const li = H.indexOfNl(s)
//   const fr = li < 0 ? [H.slice()()(s), ''] : [H.slice()(li)(s), H.slice(li + 1)()(s)]

//   const res = fr
//   return res
// }

H.untilStrOccur = S.pipe([
  H.indexOf,
  // H.splitLines,
  // H.tap('#1'),
  // xs => (S.maybe(false)(S.equals(''))(S.last(xs)) ? [S.dropLast(1)(xs), S.last(xs)] : [xs, S.last(xs)]),
])

// H.concat = () => concat
H.inc = S.add(1)

H.keepLast = n => xs => S.drop(S.size(xs) - n < 0 ? 0 : S.size(xs) - n)(xs).value

H.isEmpty = obj => Object.keys(obj).length === 0

H.runFuture = fut => F.fork(e => log('Failed', e))(r => log('Succeded', r))(fut)

H.setTimeoutFut = ms =>
  F((rej, res) => {
    setTimeout(() => res(ms), ms)

    return function cancel() {
      pr('cancelled')
    }
  })

H.diffSym = xs1 => xs2 => xs1.filter(x1 => !xs2.includes(x1)).concat(xs2.filter(x2 => !xs1.includes(x2)))

module.exports = H
