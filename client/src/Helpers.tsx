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

