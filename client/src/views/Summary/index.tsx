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
        youC1
        youC2
        youC3
        c1S1Percentage
        c1S2Percentage
        c1S3Percentage
        c2S1Percentage
        c2S2Percentage
        c2S3Percentage
        c3S1Percentage
        c3S2Percentage
        c3S3Percentage
    },
  }
`

export type StrategyChoiceSummaryQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  sessionId: string
}

export type StrategyChoiceSummary = {
    youC1: string
    youC2: string
    youC3: string
        c1S1Percentage: number
        c1S2Percentage: number
        c1S3Percentage: number
        c2S1Percentage: number
        c2S2Percentage: number
        c2S3Percentage: number
        c3S1Percentage: number
        c3S2Percentage: number
        c3S3Percentage: number
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

        <h2>First challenge</h2>
        You voted for: {strategyChoiceSummary && strategyChoiceSummary.youC1}
        <br/>
        <br/>
        % of people who voted for Strategy 1: {strategyChoiceSummary && strategyChoiceSummary.c1S1Percentage * 100}%
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.c1S2Percentage !== null && 
        <>
        % of people who voted for Strategy 2: {strategyChoiceSummary && strategyChoiceSummary.c1S2Percentage * 100}%
        </>
        }
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.c1S3Percentage !== null && 
        <>
        % of people who voted for Strategy 3: {strategyChoiceSummary && strategyChoiceSummary.c1S3Percentage * 100}%
        </>
        }

        <h2>Second challenge</h2>
        You voted for: {strategyChoiceSummary && strategyChoiceSummary.youC2}
        <br/>
        <br/>
        % of people who voted for Strategy 1: {strategyChoiceSummary && strategyChoiceSummary.c2S1Percentage * 100}%
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.c2S2Percentage !== null && 
        <>
        % of people who voted for Strategy 2: {strategyChoiceSummary && strategyChoiceSummary.c2S2Percentage * 100}%
        </>
        }
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.c2S3Percentage !== null && 
        <>
        % of people who voted for Strategy 3: {strategyChoiceSummary && strategyChoiceSummary.c2S3Percentage * 100}%
        </>
        }

        <h2>Third challenge</h2>
        You voted for: {strategyChoiceSummary && strategyChoiceSummary.youC3}
        <br/>
        <br/>
        % of people who voted for Strategy 1: {strategyChoiceSummary && strategyChoiceSummary.c3S1Percentage * 100}%
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.c3S2Percentage !== null && 
        <>
        % of people who voted for Strategy 2: {strategyChoiceSummary && strategyChoiceSummary.c3S2Percentage * 100}%
        </>
        }
        <br/>
        {strategyChoiceSummary && strategyChoiceSummary.c3S3Percentage !== null && 
        <>
        % of people who voted for Strategy 3: {strategyChoiceSummary && strategyChoiceSummary.c3S3Percentage * 100}%
        </>
        }
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
