export const MOB = 'MOB'
export const HOUSING = 'HOUSING'
export const HOUSING_C1OF3 = 'HOUSING_C1OF3'
export const HOUSING_C2OF3 = 'HOUSING_C2OF3'
export const HOUSING_C3OF3 = 'HOUSING_C3OF3'
export const YOU_SELECTED = 'YOU_SELECTED'
export const HOW_IT_AFFECTS_BAYVILLE = 'HOW_IT_AFFECTS_BAYVILLE'
export const REMAINING_BUDGET = 'REMAINING_BUDGET'

const translations: any = {
  MOB: {
    en: 'Mayor of Bayville',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOUSING: {
    en: 'Housing',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOUSING_C1OF3: {
    en: "Challenge 1 of 3: Renter's issues",
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOUSING_C2OF3: {
    en: 'Challenge 2 of 3: Infill Development',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOUSING_C3OF3: {
    en: 'Challenge 3 of 3: Regional policy',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  YOU_SELECTED: {
    en: 'You selected',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOW_IT_AFFECTS_BAYVILLE: {
    en: 'How it affects Bayville',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  REMAINING_BUDGET: {
    en: 'Remaining budget',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
}

let translate: any = (lang: string, text: string) => {
  if (lang !== 'en' && lang !== 'es' && lang !== 'cn') lang = 'en'

  return translations[text][lang]
}

export { translate }
