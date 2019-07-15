import cookie from 'react-cookies'

let constructInnerHTML = (text: string | undefined) => {
    if (!text)
        return {__html: ''}
    return {__html: text}
}
export {constructInnerHTML}

const STARTING_COINS = 100
let getCoinCount = () => {
    const coinsUsed = cookie.load(102)

    // Start coins = 100
    return STARTING_COINS - parseInt(coinsUsed)
}
export {getCoinCount}

let getProgress = (stepId: string) => {
    if (parseInt(stepId) >= 100 && parseInt(stepId) <= 199) {
        return "1 of 3";
    }

    else if (parseInt(stepId) >= 200 && parseInt(stepId) <= 299) {
        return "2 of 3";
    }

    else if (parseInt(stepId) >= 300 && parseInt(stepId) <= 399) {
        return "3 of 3";
    }
}
export {getProgress}
