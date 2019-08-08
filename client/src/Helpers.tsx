import cookie from 'react-cookies'

let constructInnerHTML = (text: string | undefined) => {
  if (!text) return { __html: '' }
  return { __html: text }
}
export { constructInnerHTML }

const STARTING_COINS = 100
const housingDecisionPointsByStepId = [102, 203, 307]
const economyDecisionPointsByStepId = [403, 507]
const environmentDecisionPointsByStepId = [607, 703, 805]
const transportationDecisionPointsByStepId = [905, 1005, 1105]

let getCoinCount = (stepId: string) => {
  if (parseInt(stepId) >= 100 && parseInt(stepId) < 400) {
    let coinsUsed: number = 0

    for (const i in housingDecisionPointsByStepId) {
      coinsUsed += cookie.load(`strat-${housingDecisionPointsByStepId[i]}`)
        ? parseInt(cookie.load(`strat-${housingDecisionPointsByStepId[i]}`))
        : 0
    }
    return STARTING_COINS - coinsUsed
  } else if (parseInt(stepId) >= 400 && parseInt(stepId) < 600) {
    let coinsUsed: number = 0

    for (const i in economyDecisionPointsByStepId) {
      coinsUsed += cookie.load(`strat-${economyDecisionPointsByStepId[i]}`)
        ? parseInt(cookie.load(`strat-${economyDecisionPointsByStepId[i]}`))
        : 0
    }
    return STARTING_COINS - coinsUsed
  } else if (parseInt(stepId) >= 600 && parseInt(stepId) < 900) {
    let coinsUsed: number = 0

    for (const i in environmentDecisionPointsByStepId) {
      coinsUsed += cookie.load(`strat-${environmentDecisionPointsByStepId[i]}`)
        ? parseInt(cookie.load(`strat-${environmentDecisionPointsByStepId[i]}`))
        : 0
    }
    return STARTING_COINS - coinsUsed
  } else if (parseInt(stepId) >= 900 && parseInt(stepId) < 1200) {
    let coinsUsed: number = 0

    for (const i in transportationDecisionPointsByStepId) {
      coinsUsed += cookie.load(`strat-${transportationDecisionPointsByStepId[i]}`)
        ? parseInt(cookie.load(`strat-${transportationDecisionPointsByStepId[i]}`))
        : 0
    }
    return STARTING_COINS - coinsUsed
  }

  return STARTING_COINS
}
export { getCoinCount }

let clearCoinCookies = () => {
  for (const i in economyDecisionPointsByStepId) {
    cookie.remove(`strat-${economyDecisionPointsByStepId[i]}`)
  }

  for (const i in housingDecisionPointsByStepId) {
    cookie.remove(`strat-${housingDecisionPointsByStepId[i]}`)
  }

  for (const i in environmentDecisionPointsByStepId) {
    cookie.remove(`strat-${environmentDecisionPointsByStepId[i]}`)
  }

  for (const i in transportationDecisionPointsByStepId) {
    cookie.remove(`strat-${transportationDecisionPointsByStepId[i]}`)
  }
}
export { clearCoinCookies }

let addCompletedCookie = (stepId: string) => {
  let completedSteps = cookie.load('completed')
  if (!(stepId in completedSteps)) {
    completedSteps.push(parseInt(stepId))
    cookie.save('completed', completedSteps, { path: '/' })
  }
}
export { addCompletedCookie }

let checkIfCompleted = (stepId: string) => {
  let completedSteps = cookie.load('completed')
  return parseInt(stepId) in completedSteps
}
export { checkIfCompleted }
