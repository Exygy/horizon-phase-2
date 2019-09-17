export type StepQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  renderMdToHtml: boolean
}

export type Step = {
  publicField1: string
  publicField2: string
  publicField3: string
  publicField4: string
  publicField5: string
  publicField6: string
  publicField7: string
  publicField8: string
  publicField9: string
  publicField10: string
  publicField11: string
  publicField12: string
  publicField13: string
  publicField14: string
  publicField15: string
  publicField16: string
  publicField17: string
  publicField18: string
  publicField19: string
  publicField20: string
  publicField21: string
  publicField22: string
  publicField23: string
  publicField24: string
  privateField1: string
  privateField2: string
  privateField3: string
  privateField4: string
}

export type StepQueryResponse = {
  step: Step
}

export type StepRouteParams = {
  stepId: string
}
