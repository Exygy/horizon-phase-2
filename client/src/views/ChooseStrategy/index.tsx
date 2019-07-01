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
import person6 from 'src/images/person6.png'
import {stepQuery} from 'src/Queries'
import {StepQueryParams, Step, StepQueryResponse, StepRouteParams} from 'src/Types'
import cookie from 'react-cookies'
import {getProgress} from 'src/Helpers'

const queryString = require('query-string');

const strategyChoiceMutation = gql`
  mutation createStrategyChoice($originStepId: Int!, $stepId: Int!, $sessionId: UUID!) {
    createStrategyChoice(originStepId: $originStepId, stepId: $stepId, sessionId: $sessionId) {
      error
    }
  }
`
type StrategyChoiceMutationResponse = {
  error: string
}

type StrategyChoiceMutationParams = {
  stepId: number
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse> & {
    strategyChoiceMutation: Function
}
type Props = StepQueryProps & OwnProps

type State = {
  isSubmitting: boolean
}

class ChooseStrategyView extends React.Component<Props, State> {
      state = {
        isSubmitting: false,
      }

  componentDidMount = () => {
  }

  recordChoiceAndRedirect = async (stepId: string | undefined, path:string, coinsSpent: string | undefined) => {
      if (!stepId || ! coinsSpent)
          return

    this.setState({ isSubmitting: true })
    let { data } = await this.props.strategyChoiceMutation({
        variables: { originStepId: this.props.match.params.stepId, stepId, sessionId: cookie.load('session_id')},
    })
    this.setState({ isSubmitting: false })

    if (!data.error) {
        cookie.save(this.props.match.params.stepId, coinsSpent, { path: '/' })
        this.props.history.push(path)
    }

    else {
        alert("There was a problem recording your choice.")
    }
  }

  render() {
    const { step, loading, } = this.props.data

    return (
      <Container id="scenario-view">
        <h2 dangerouslySetInnerHTML={{ __html: step ? step.publicField1 : '' }} />
        <h3 dangerouslySetInnerHTML={{ __html: step ? step.publicField2 : '' }} />
        <p>{step && step.publicField3}</p>
        <h4>Pros:</h4>
        <p>{step && step.publicField4}</p>
        <h4>Cons</h4>
        <p>{step && step.publicField5}</p>
        <h4>Coins</h4>
        <p>{step && step.publicField6}</p>
        <Button onClick={() => this.recordChoiceAndRedirect(step && step.privateField1, `/strategy-feedback/${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}&coins_spent=${step && step.publicField6}`, step && step.publicField6)} className="btn primary">{step && step.publicField7}</Button>
        <br/>
        <h3 dangerouslySetInnerHTML={{ __html: step ? step.publicField8 : '' }} />
        <p>{step && step.publicField9}</p>
        <h4>Pros:</h4>
        <p>{step && step.publicField10}</p>
        <h4>Cons</h4>
        <p>{step && step.publicField11}</p>
        <h4>Coins</h4>
        <p>{step && step.publicField12}</p>
        <Button onClick={() => this.recordChoiceAndRedirect(step && step.privateField2, `/strategy-feedback/${step && step.privateField2}?lang=${queryString.parse(this.props.location.search).lang}&coins_spent=${step && step.publicField12}`, step && step.publicField12)} className="btn primary">{step && step.publicField13}</Button>
        <br/>
        <h3 dangerouslySetInnerHTML={{ __html: step ? step.publicField14 : '' }} />
        <p>{step && step.publicField15}</p>
        <h4>Pros:</h4>
        <p>{step && step.publicField16}</p>
        <h4>Cons</h4>
        <p>{step && step.publicField17}</p>
        <h4>Coins</h4>
        <p>{step && step.publicField18}</p>
        <Button onClick={() => this.recordChoiceAndRedirect(step && step.privateField3, `/strategy-feedback/${step && step.privateField3}?lang=${queryString.parse(this.props.location.search).lang}&coins_spent=${step && step.publicField18}`, step && step.publicField18)} className="btn primary">{step && step.publicField19}</Button>
        <br/>
        <br/>
        {getProgress(this.props.match.params.stepId)}
      </Container>
    )
  }
}

export default compose(
    graphql(strategyChoiceMutation, { name: 'strategyChoiceMutation' }),
graphql<Props, StepQueryResponse>(stepQuery, {
  options: (props: OwnProps): QueryOpts<StepQueryParams> => ({
    variables: {
      id: parseInt(props.match.params.stepId),
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
      renderMdToHtml: true
    },
  }),
}))(ChooseStrategyView)
