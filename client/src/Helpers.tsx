import cookie from 'react-cookies'

let constructInnerHTML = (text: string | undefined) => {
  if (!text) return { __html: '' }
  return { __html: text }
}
export { constructInnerHTML }

const STARTING_COINS = 100
const decisionPointsByStepId = [102, 203, 307, 403, 507, 607, 703, 805, 905, 1005, 1105]

let getCoinCount = () => {
  let coinsUsed: number = 0

  for (const i in decisionPointsByStepId) {
    coinsUsed += cookie.load(`strat-${decisionPointsByStepId[i]}`)
      ? parseInt(cookie.load(`strat-${decisionPointsByStepId[i]}`))
      : 0
  }

  // Start coins = 100
  return STARTING_COINS - coinsUsed
}
export { getCoinCount }

let clearCoinCookies = () => {
  for (const i in decisionPointsByStepId) {
    cookie.remove(`strat-${decisionPointsByStepId[i]}`)
      ? parseInt(cookie.load(`strat-${decisionPointsByStepId[i]}`))
      : 0
  }

  cookie.remove('completed')
}
export { clearCoinCookies }

let addCompletedCookie = (stepId: string) => {
  if (!cookie.load('completed')) {
    cookie.save('completed', JSON.stringify([]))
  }

  let completedSteps = cookie.load('completed')
  console.log(stepId)
  console.log(stepId in completedSteps)
  if (!(stepId in completedSteps)) {
    completedSteps.push(parseInt(stepId))
    cookie.save('completed', JSON.stringify(completedSteps))
  }
}
export { addCompletedCookie }

let checkIfCompleted = (stepId: string) => {
  let completedSteps = cookie.load('completed')
  if (completedSteps) {
    return stepId in completedSteps
  }

  return false
}
export { checkIfCompleted }
