export const MOB = 'MOB'
export const HOUSING = 'HOUSING'
export const HOUSING_C1OF3 = 'HOUSING_C1OF3'
export const HOUSING_C2OF3 = 'HOUSING_C2OF3'
export const HOUSING_C3OF3 = 'HOUSING_C3OF3'
export const ECONOMY = 'ECONOMY'
export const ECONOMY_C1OF2 = 'ECONOMY_C1OF2'
export const ECONOMY_C2OF2 = 'ECONOMY_C2OF2'
export const ENVIRONMENT = 'ENVIRONMENT'
export const ENVIRONMENT_C1OF3 = 'ENVIRONMENT_C1OF3'
export const ENVIRONMENT_C2OF3 = 'ENVIRONMENT_C2OF3'
export const ENVIRONMENT_C3OF3 = 'ENVIRONMENT_C3OF3'
export const TRANSPORATION = 'TRANSPORATION'
export const TRANSPORATION_C1OF3 = 'TRANSPORATION_C1OF3'
export const TRANSPORATION_C2OF3 = 'TRANSPORATION_C2OF3'
export const TRANSPORATION_C3OF3 = 'TRANSPORATION_C3OF3'
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
    en: 'Challenge 1 of 3: Housing Affordability',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOUSING_C2OF3: {
    en: 'Challenge 2 of 3: Regional Policy',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  HOUSING_C3OF3: {
    en: 'Challenge 3 of 3: Infill Development',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ENVIRONMENT: {
    en: 'Environment',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ENVIRONMENT_C1OF3: {
    en: 'Challenge 1 of 3: Open Space',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ENVIRONMENT_C2OF3: {
    en: 'Challenge 2 of 3: Sea Level Rise',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ENVIRONMENT_C3OF3: {
    en: 'Challenge 3 of 3: Earthquake',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  TRANSPORATION: {
    en: 'Transportation',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  TRANSPORATION_C1OF3: {
    en: 'Challenge 1 of 3: Price Transportation Service',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  TRANSPORATION_C2OF3: {
    en: 'Challenge 2 of 3: Prioritize Active Modes',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  TRANSPORATION_C3OF3: {
    en: 'Challenge 3 of 3: Invest in Transit',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ECONOMY: {
    en: 'Economy',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ECONOMY_C1OF2: {
    en: 'Challenge 1 of 2: Workforce',
    es: 'NEEDS SPANISH TRANSLATION',
    cn: 'NEEDS CHINESE TRANSLATION',
  },
  ECONOMY_C2OF2: {
    en: 'Challenge 2 of 2: Shift Location of Jobs',
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
