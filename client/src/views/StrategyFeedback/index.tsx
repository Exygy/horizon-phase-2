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
import {stepQuery} from 'src/Queries'
import {StepQueryParams, Step, StepQueryResponse, StepRouteParams} from 'src/Types'
import { constructInnerHTML, getCoinCount } from 'src/Helpers'
import cookie from 'react-cookies'
import {getProgress} from 'src/Helpers'

const queryString = require('query-string');

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class StrategyFeedbackView extends React.Component<Props, {}> {
  componentDidMount = () => {
  }

  processText = (text: string | undefined) => {
      if (!text || !queryString.parse(this.props.location.search).coins_spent)
          return

      text = text.replace("&lt;coins_spent&gt;", queryString.parse(this.props.location.search).coins_spent)
      text = text.replace("&lt;coins_left&gt;", getCoinCount().toString())
      return text
  }

  render() {
    const { step, loading } = this.props.data

    return (
      <Container id="strategy-feedback-view">
        <p dangerouslySetInnerHTML={constructInnerHTML(this.processText(step && step.publicField1))}/>
        <Button as={Link} to={`${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}`} className="btn primary">{step && step.publicField3}</Button>
        <br/>
        {getProgress(this.props.match.params.stepId)}
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
