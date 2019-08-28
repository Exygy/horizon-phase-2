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
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Progress,
  Responsive,
  Segment,
  Sidebar,
  Transition,
} from 'semantic-ui-react'
import { Form, Input } from 'formsy-semantic-ui-react'
import { stepQuery } from 'src/Queries'
import { StepQueryParams, Step, StepQueryResponse, StepRouteParams } from 'src/Types'
import { constructInnerHTML, getCoinCount, addCompletedCookie, checkIfCompleted } from 'src/Helpers'
import cookie from 'react-cookies'
import CustomHeader from 'src/components/CustomHeader/'
import Main from 'src/components/Main/'
import './style.css'
import {
  STRATEGY_1,
  STRATEGY_2,
  STRATEGY_3,
  OF_PARTICIPANTS,
  YOUR_VOTE,
  SHARE_YOUR_RESULTS,
  READY_NEXT,
  NICE_WORK_MAYOR,
  MOB,
  HOUSING,
  ECONOMY,
  TRANSPORATION,
  ENVIRONMENT,
  translate,
} from 'src/Translate'

const queryString = require('query-string')

export const strategyChoiceSummaryQuery = gql`
  query strategyChoiceSummary($id: ID, $lang: String, $sessionId: UUID, $renderMdToHtml: Boolean) {
    strategyChoiceSummary(
      id: $id
      lang: $lang
      sessionId: $sessionId
      renderMdToHtml: $renderMdToHtml
    ) {
      headerSubtitle
      subheaderSubtitle
      c1Title
      c1SIndex
      c1PercentAgreed
      c1S1Name
      c1S1Percentage
      c1S2Name
      c1S2Percentage
      c1S3Name
      c1S3Percentage

      c2Title
      c2SIndex
      c2PercentAgreed
      c2S1Name
      c2S1Percentage
      c2S2Name
      c2S2Percentage
      c2S3Name
      c2S3Percentage

      c3Title
      c3SIndex
      c3PercentAgreed
      c3S1Name
      c3S1Percentage
      c3S2Name
      c3S2Percentage
      c3S3Name
      c3S3Percentage

      feedbackTitle
      feedbackSubtitle
      feedbackCta
    }
  }
`

export type StrategyChoiceSummaryQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  sessionId: string
  renderMdToHtml: boolean
}

export type StrategyChoiceSummary = {
  headerSubtitle: string
  subheaderSubtitle: string
  c1Title: string
  c1SIndex: number
  c1PercentAgreed: number
  c1S1Name: string
  c1S1Percentage: number
  c1S2Name: string
  c1S2Percentage: number
  c1S3Name: string
  c1S3Percentage: number

  c2Title: string
  c2SIndex: number
  c2PercentAgreed: number
  c2S1Name: string
  c2S1Percentage: number
  c2S2Name: string
  c2S2Percentage: number
  c2S3Name: string
  c2S3Percentage: number

  c3Title: string
  c3SIndex: number
  c3PercentAgreed: number
  c3S1Name: string
  c3S1Percentage: number
  c3S2Name: string
  c3S2Percentage: number
  c3S3Name: string
  c3S3Percentage: number

  feedbackTitle: string
  feedbackSubtitle: string
  feedbackCta: string
}

const feedbackMutation = gql`
  mutation createCategoryFeedback($text: String!, $sessionId: UUID!, $stepId: Int!) {
    createCategoryFeedback(text: $text, sessionId: $sessionId, stepId: $stepId) {
      error
    }
  }
`

type State = {
  isSubmitting: boolean
  feedbackText: string
  errorMsg: string
}

type FeedbackResponse = {
  error: string
}

type FeedbackMutationParams = {
  feedbackText: string
  sessionId: string
}

export type StrategyChoiceSummaryResponse = {
  strategyChoiceSummary: StrategyChoiceSummary
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<
  StrategyChoiceSummaryQueryParams,
  StrategyChoiceSummaryResponse
>
type Props = StepQueryProps & OwnProps & { feedbackMutation: Function }

class SummaryView extends React.Component<Props, State> {
  state = {
    isSubmitting: false,
    feedbackText: '',
    errorMsg: '',
  }

  componentDidMount = () => {}

  componentWillMount = () => {
    addCompletedCookie(this.props.match.params.stepId)
  }

  onValidSubmit = async () => {
    this.setState({ errorMsg: '', isSubmitting: true })
    const { feedbackText } = this.state

    let { data } = await this.props.feedbackMutation({
      variables: {
        text: feedbackText,
        sessionId: cookie.load('session_id'),
        stepId: parseInt(this.props.match.params.stepId),
      },
    })
    this.setState({ isSubmitting: false })

    if (!data.createCategoryFeedback.error) {
      this.props.history.push(
        `/onboarding/choose-category/10006?lang=${
          queryString.parse(this.props.location.search).lang
        }&submittedfeedback=true`
      )
    } else {
      console.error('Error')
    }
  }

  onFieldChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.currentTarget
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  render() {
    const { strategyChoiceSummary, loading } = this.props.data
    const { feedbackText, isSubmitting, errorMsg } = this.state

    return (
      <div className="view" id="summary-view">
        <Main stepId={this.props.match.params.stepId}>
          <Form
            className="forma"
            loading={loading || isSubmitting}
            onValidSubmit={this.onValidSubmit}
          >
            <CustomHeader
              stepId={this.props.match.params.stepId}
              lang={queryString.parse(this.props.location.search).lang}
              desc={strategyChoiceSummary && strategyChoiceSummary.headerSubtitle}
            />
            <div className="top-intro">
              <h1 className="">
                {translate(queryString.parse(this.props.location.search).lang, NICE_WORK_MAYOR)}
              </h1>
              <p
                className="large"
                dangerouslySetInnerHTML={constructInnerHTML(
                  strategyChoiceSummary && strategyChoiceSummary.subheaderSubtitle
                )}
              />
            </div>
            <div className="content-box">
              <Grid>
                <Grid.Column width={1}>
                  <h2>1.</h2>
                </Grid.Column>
                <Grid.Column width={15}>
                  <h2>{strategyChoiceSummary && strategyChoiceSummary.c1Title}</h2>
                  <p className="emphasized">
                    {strategyChoiceSummary &&
                      Math.round(strategyChoiceSummary.c1PercentAgreed * 100)}
                    %{' '}
                    {translate(queryString.parse(this.props.location.search).lang, OF_PARTICIPANTS)}
                  </p>

                  <div className="strat-section">
                    <p>
                      <span className="strat">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_1)}:{' '}
                      </span>
                      {strategyChoiceSummary && strategyChoiceSummary.c1S1Name}
                    </p>
                    <Progress
                      progress
                      className={`prog-bar ${
                        strategyChoiceSummary && strategyChoiceSummary.c1SIndex == 0
                          ? 'mine'
                          : 'not-mine'
                      }`}
                      percent={
                        strategyChoiceSummary &&
                        Math.round(strategyChoiceSummary.c1S1Percentage * 100)
                      }
                    />
                    {strategyChoiceSummary && strategyChoiceSummary.c1SIndex == 0 && (
                      <h4 className="your-vote">
                        {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                      </h4>
                    )}
                  </div>

                  <div className="strat-section">
                    <p>
                      <span className="strat">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_2)}:{' '}
                      </span>
                      {strategyChoiceSummary && strategyChoiceSummary.c1S2Name}
                    </p>
                    <Progress
                      progress
                      className={`prog-bar ${
                        strategyChoiceSummary && strategyChoiceSummary.c1SIndex == 1
                          ? 'mine'
                          : 'not-mine'
                      }`}
                      percent={
                        strategyChoiceSummary &&
                        Math.round(strategyChoiceSummary.c1S2Percentage * 100)
                      }
                    />
                    {strategyChoiceSummary && strategyChoiceSummary.c1SIndex == 1 && (
                      <h4 className="your-vote">
                        {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                      </h4>
                    )}
                  </div>

                  {strategyChoiceSummary && strategyChoiceSummary.c1S3Name && (
                    <div className="strat-section">
                      <p>
                        <span className="strat">
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            STRATEGY_3
                          )}
                          :{' '}
                        </span>
                        {strategyChoiceSummary && strategyChoiceSummary.c1S3Name}
                      </p>
                      <Progress
                        progress
                        className={`prog-bar ${
                          strategyChoiceSummary && strategyChoiceSummary.c1SIndex == 2
                            ? 'mine'
                            : 'not-mine'
                        }`}
                        percent={
                          strategyChoiceSummary &&
                          Math.round(strategyChoiceSummary.c1S3Percentage * 100)
                        }
                      />
                      {strategyChoiceSummary && strategyChoiceSummary.c1SIndex == 2 && (
                        <h4 className="your-vote">
                          {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                        </h4>
                      )}
                    </div>
                  )}
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column width={1}>
                  <h2>2.</h2>
                </Grid.Column>
                <Grid.Column width={15}>
                  <h2>{strategyChoiceSummary && strategyChoiceSummary.c2Title}</h2>
                  <p className="emphasized">
                    {strategyChoiceSummary &&
                      Math.round(strategyChoiceSummary.c2PercentAgreed * 100)}
                    %{' '}
                    {translate(queryString.parse(this.props.location.search).lang, OF_PARTICIPANTS)}
                  </p>

                  <div className="strat-section">
                    <p>
                      <span className="strat">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_1)}:{' '}
                      </span>
                      {strategyChoiceSummary && strategyChoiceSummary.c2S1Name}
                    </p>
                    <Progress
                      progress
                      className={`prog-bar ${
                        strategyChoiceSummary && strategyChoiceSummary.c2SIndex == 0
                          ? 'mine'
                          : 'not-mine'
                      }`}
                      percent={
                        strategyChoiceSummary &&
                        Math.round(strategyChoiceSummary.c2S1Percentage * 100)
                      }
                    />
                    {strategyChoiceSummary && strategyChoiceSummary.c2SIndex == 0 && (
                      <h4 className="your-vote">
                        {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                      </h4>
                    )}
                  </div>

                  <div className="strat-section">
                    <p>
                      <span className="strat">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_2)}:{' '}
                      </span>
                      {strategyChoiceSummary && strategyChoiceSummary.c2S2Name}
                    </p>
                    <Progress
                      progress
                      className={`prog-bar ${
                        strategyChoiceSummary && strategyChoiceSummary.c2SIndex == 1
                          ? 'mine'
                          : 'not-mine'
                      }`}
                      percent={
                        strategyChoiceSummary &&
                        Math.round(strategyChoiceSummary.c2S2Percentage * 100)
                      }
                    />
                    {strategyChoiceSummary && strategyChoiceSummary.c2SIndex == 1 && (
                      <h4 className="your-vote">
                        {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                      </h4>
                    )}
                  </div>

                  {strategyChoiceSummary && strategyChoiceSummary.c2S3Name && (
                    <div className="strat-section">
                      <p>
                        <span className="strat">
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            STRATEGY_3
                          )}
                          :{' '}
                        </span>
                        {strategyChoiceSummary && strategyChoiceSummary.c2S3Name}
                      </p>
                      <Progress
                        progress
                        className={`prog-bar ${
                          strategyChoiceSummary && strategyChoiceSummary.c2SIndex == 2
                            ? 'mine'
                            : 'not-mine'
                        }`}
                        percent={
                          strategyChoiceSummary &&
                          Math.round(strategyChoiceSummary.c2S3Percentage * 100)
                        }
                      />
                      {strategyChoiceSummary && strategyChoiceSummary.c2SIndex == 2 && (
                        <h4 className="your-vote">
                          {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                        </h4>
                      )}
                    </div>
                  )}
                </Grid.Column>
              </Grid>

              {strategyChoiceSummary && strategyChoiceSummary.c3Title && (
                <Grid>
                  <Grid.Column width={1}>
                    <h2>3.</h2>
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <h2>{strategyChoiceSummary && strategyChoiceSummary.c3Title}</h2>
                    <p className="emphasized">
                      {strategyChoiceSummary &&
                        Math.round(strategyChoiceSummary.c3PercentAgreed * 100)}
                      %{' '}
                      {translate(
                        queryString.parse(this.props.location.search).lang,
                        OF_PARTICIPANTS
                      )}
                    </p>

                    <div className="strat-section">
                      <p>
                        <span className="strat">
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            STRATEGY_1
                          )}
                          :{' '}
                        </span>
                        {strategyChoiceSummary && strategyChoiceSummary.c3S1Name}
                      </p>
                      <Progress
                        progress
                        className={`prog-bar ${
                          strategyChoiceSummary && strategyChoiceSummary.c3SIndex == 0
                            ? 'mine'
                            : 'not-mine'
                        }`}
                        percent={
                          strategyChoiceSummary &&
                          Math.round(strategyChoiceSummary.c3S1Percentage * 100)
                        }
                      />
                      {strategyChoiceSummary && strategyChoiceSummary.c3SIndex == 0 && (
                        <h4 className="your-vote">
                          {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                        </h4>
                      )}
                    </div>

                    <div className="strat-section">
                      <p>
                        <span className="strat">
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            STRATEGY_2
                          )}
                          :{' '}
                        </span>
                        {strategyChoiceSummary && strategyChoiceSummary.c3S2Name}
                      </p>
                      <Progress
                        progress
                        className={`prog-bar ${
                          strategyChoiceSummary && strategyChoiceSummary.c3SIndex == 1
                            ? 'mine'
                            : 'not-mine'
                        }`}
                        percent={
                          strategyChoiceSummary &&
                          Math.round(strategyChoiceSummary.c3S2Percentage * 100)
                        }
                      />
                      {strategyChoiceSummary && strategyChoiceSummary.c3SIndex == 1 && (
                        <h4 className="your-vote">
                          {translate(queryString.parse(this.props.location.search).lang, YOUR_VOTE)}
                        </h4>
                      )}
                    </div>

                    {strategyChoiceSummary && strategyChoiceSummary.c3S3Name && (
                      <div className="strat-section">
                        <p>
                          <span className="strat">
                            {translate(
                              queryString.parse(this.props.location.search).lang,
                              STRATEGY_3
                            )}
                            :{' '}
                          </span>
                          {strategyChoiceSummary && strategyChoiceSummary.c3S3Name}
                        </p>
                        <Progress
                          progress
                          className={`prog-bar ${
                            strategyChoiceSummary && strategyChoiceSummary.c3SIndex == 2
                              ? 'mine'
                              : 'not-mine'
                          }`}
                          percent={
                            strategyChoiceSummary &&
                            Math.round(strategyChoiceSummary.c3S3Percentage * 100)
                          }
                        />
                        {strategyChoiceSummary && strategyChoiceSummary.c3SIndex == 2 && (
                          <h4 className="your-vote">
                            {translate(
                              queryString.parse(this.props.location.search).lang,
                              YOUR_VOTE
                            )}
                          </h4>
                        )}
                      </div>
                    )}
                  </Grid.Column>
                </Grid>
              )}

              <div className="share">
                <h4>
                  {translate(
                    queryString.parse(this.props.location.search).lang,
                    SHARE_YOUR_RESULTS
                  )}
                </h4>
                <Button color="facebook" icon labelPosition="left">
                  <Icon name="facebook" />
                  Facebook
                </Button>
                <Button color="twitter" icon labelPosition="left">
                  <Icon name="twitter" />
                  Twitter
                </Button>
              </div>
              <div className="next-challenges">
                <h1>{translate(queryString.parse(this.props.location.search).lang, READY_NEXT)}</h1>
                <a
                  className="pill housing"
                  onClick={() =>
                    this.props.history.push(
                      `/scenario/100?lang=${queryString.parse(this.props.location.search).lang}`
                    )
                  }
                  href="#"
                >
                  <h2>{translate(queryString.parse(this.props.location.search).lang, HOUSING)}</h2>
                </a>
                <a
                  className="pill transportation"
                  onClick={() =>
                    this.props.history.push(
                      `/scenario/1000?lang=${queryString.parse(this.props.location.search).lang}`
                    )
                  }
                  href="#"
                >
                  <h2>
                    {translate(queryString.parse(this.props.location.search).lang, TRANSPORATION)}
                  </h2>
                </a>
                <a
                  className="pill economy"
                  onClick={() =>
                    this.props.history.push(
                      `/scenario/500?lang=${queryString.parse(this.props.location.search).lang}`
                    )
                  }
                  href="#"
                >
                  <h2>{translate(queryString.parse(this.props.location.search).lang, ECONOMY)}</h2>
                </a>
                <a
                  className="pill environment"
                  onClick={() =>
                    this.props.history.push(
                      `/scenario/700?lang=${queryString.parse(this.props.location.search).lang}`
                    )
                  }
                  href="#"
                >
                  <h2>
                    {translate(queryString.parse(this.props.location.search).lang, ENVIRONMENT)}
                  </h2>
                </a>
              </div>
              <div className="feedback">
                <h1>{strategyChoiceSummary && strategyChoiceSummary.feedbackTitle}</h1>
                <p className="sub-heading">
                  {strategyChoiceSummary && strategyChoiceSummary.feedbackSubtitle}
                </p>
                <Form.TextArea
                  name="feedbackText"
                  className="ta"
                  label=""
                  required
                  value={feedbackText}
                  placeholder=""
                  onChange={this.onFieldChange}
                />
                <div className="btn-holder-feedback">
                  <Button className="btn primary" disabled={isSubmitting}>
                    {strategyChoiceSummary && strategyChoiceSummary.feedbackCta}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Main>
      </div>
    )
  }
}

export default compose(
  graphql(feedbackMutation, { name: 'feedbackMutation' }),
  graphql<Props, StrategyChoiceSummaryResponse>(strategyChoiceSummaryQuery, {
    options: (props: OwnProps): QueryOpts<StrategyChoiceSummaryQueryParams> => ({
      variables: {
        id: parseInt(props.match.params.stepId),
        sessionId: cookie.load('session_id'),
        lang: queryString.parse(props.location.search).lang
          ? queryString.parse(props.location.search).lang
          : 'en',
        renderMdToHtml: true,
      },
    }),
  })
)(SummaryView)
