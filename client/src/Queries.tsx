import gql from 'graphql-tag'

export const stepQuery = gql`
  query step($id: ID, $lang: String, $renderMdToHtml: Boolean) {
    step(id: $id, lang: $lang, renderMdToHtml: $renderMdToHtml) {
      id
      publicField1
      publicField2
      publicField3
      publicField4
      publicField5
      publicField6
      publicField7
      publicField8
      publicField9
      publicField10
      publicField11
      publicField12
      publicField13
      publicField14
      publicField15
      publicField16
      publicField17
      publicField18
      publicField19
      publicField20
      publicField21
      publicField22
      publicField23
      publicField24
      privateField1
      privateField2
      privateField3
      privateField4
    }
  }
`
