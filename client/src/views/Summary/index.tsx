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

export const strategyChoiceSummaryQuery = gql`
  query strategyChoiceSummary($id: ID, $lang: String, $sessionId: UUID) {
    strategyChoiceSummary(id: $id, lang: $lang, sessionId: $sessionId) {
        you
        s1
        s2
        s3
    },
  }
`

export type StrategyChoiceSummaryQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  sessionId: string
}

export type StrategyChoiceSummary = {
    you: string
    s1: number
    s2: number
    s3: number
}

export type StrategyChoiceSummaryResponse = {
    strategyChoiceSummary: StrategyChoiceSummary
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StrategyChoiceSummaryQueryParams, StrategyChoiceSummaryResponse>
type Props = StepQueryProps & OwnProps

class SummaryView extends React.Component<Props, {}> {
  componentDidMount = () => {
  }


  render() {
    const { strategyChoiceSummary, loading } = this.props.data

    return (
      <Container id="summary-view">
        <h1>Summary</h1>
        You voted for: {strategyChoiceSummary && strategyChoiceSummary.you}
        <br/>
        <br/>
        % of people who voted for Strategy 1: {strategyChoiceSummary && strategyChoiceSummary.s1 * 100}%
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.s2 !== null && 
        <>
        % of people who voted for Strategy 2: {strategyChoiceSummary && strategyChoiceSummary.s2 * 100}%
        </>
        }
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.s3 !== null && 
        <>
        % of people who voted for Strategy 3: {strategyChoiceSummary && strategyChoiceSummary.s3 * 100}%
        </>
        }
        <br/>
        <br/>
        {getProgress(this.props.match.params.stepId)}
      </Container>
    )
  }
}

export default graphql<Props, StrategyChoiceSummaryResponse>(strategyChoiceSummaryQuery, {
  options: (props: OwnProps): QueryOpts<StrategyChoiceSummaryQueryParams> => ({
    variables: {
      id: parseInt(props.match.params.stepId),
      sessionId: cookie.load('session_id'),
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
    },
  }),
})(SummaryView)
