import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ChildDataProps, withApollo, graphql, compose, QueryOpts } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import gql from 'graphql-tag'
import {
  Button,
  Container,
  Grid,
  Form,
  Header,
  Icon,
  Input,
  Image,
  Label,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Transition,
} from 'semantic-ui-react'

const queryString = require('query-string');
const stepQuery = gql`
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
      privateField1
      privateField2
      privateField3
    },
  }
`

type StepRouteParams = {
  stepId: string
}

type StepQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  renderMdToHtml: boolean
}

type Step = {
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
    privateField1: string
    privateField2: string
    privateField3: string
}

type StepQueryResponse = {
    step: Step
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class StrategyFeedbackView extends React.Component<Props, {}> {
  componentDidMount = () => {
  }

processNewLines = (text:string) => {
    return text.replace(/[\n]/g, '<br/><br/>')
}


  render() {
    const { step, loading } = this.props.data

    return (
      <Container id="strategy-feedback-view">
        <p dangerouslySetInnerHTML={{__html: step ? this.processNewLines(step.publicField1) : ''}}/>
      </Container>
    )
  }
}

export default graphql<Props, StepQueryResponse>(stepQuery, {
  options: (props: OwnProps): QueryOpts<StepQueryParams> => ({
    variables: {
      id: parseInt(props.match.params.stepId),
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
      renderMdToHtml: true
    },
  }),
})(StrategyFeedbackView)
