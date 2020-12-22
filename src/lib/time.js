const convertSecToMs = dateInSecs => dateInSecs * 1000
const convertMsToSec = dateInMilisecs => dateInMilisecs / 1000
const nowInMs = () => Date.now()
const nowInSec = () => convertMsToSec(nowInMs())

module.exports = { convertSecToMs, convertMsToSec, nowInMs, nowInSec }
