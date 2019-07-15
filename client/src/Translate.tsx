export const MOB = 'MOB'
export const HOUSING = 'HOUSING'
export const HOUSING_C1OF3 = 'HOUSING_C1OF3'

const translations:any = {
    MOB: {
        'en': 'Mayor of Bayville',
        'es': 'NEEDS SPANISH TRANSLATION',
        'cn': 'NEEDS CHINESE TRANSLATION'
    },
    HOUSING: {
        'en': 'Housing',
        'es': 'NEEDS SPANISH TRANSLATION',
        'cn': 'NEEDS CHINESE TRANSLATION'
    },
    HOUSING_C1OF3: {
        'en': 'Challenge 1 of 3: Renter\'s issues',
        'es': 'NEEDS SPANISH TRANSLATION',
        'cn': 'NEEDS CHINESE TRANSLATION'
    }
}

let translate:any = (lang: string, text:string) => {
    if (lang !== 'en' && lang !== 'es' && lang !== 'cn')
        lang='en'

    return translations[text][lang]
}

export {translate}
