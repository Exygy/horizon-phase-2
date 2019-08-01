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
import { stepQuery } from 'src/Queries'
import { StepQueryParams, Step, StepQueryResponse, StepRouteParams } from 'src/Types'
import cookie from 'react-cookies'
import Main from 'src/components/Main/'
import CustomHeader from 'src/components/CustomHeader/'
import { getCoinCount, constructInnerHTML } from 'src/Helpers'
import './style.css'
import coin from 'src/images/money.png'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import ReactCardFlip from 'react-card-flip'

const queryString = require('query-string')

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
  isFlipped: boolean
  selectedItem: number
  flippedStates: Array<boolean>
}

class ChooseStrategyView extends React.Component<Props, State> {
  state = {
    isSubmitting: false,
    isFlipped: false,
    selectedItem: 0,
    flippedStates: [],
  }

  recordChoiceAndRedirect = async () => {
    if (!this.props.data.step) return

    const { selectedItem } = this.state

    let stepIdPath = ''
    let coinsSpent = ''

    if (selectedItem == 0) {
      stepIdPath = this.props.data.step.privateField1
      coinsSpent = this.props.data.step.publicField6
    } else if (selectedItem == 1) {
      stepIdPath = this.props.data.step.privateField2
      coinsSpent = this.props.data.step.publicField12
    } else if (selectedItem == 2) {
      stepIdPath = this.props.data.step.privateField3
      coinsSpent = this.props.data.step.publicField18
    }

    // Separate step ID from path
    const re = /\/[\-\w]+\/([\d]+)/
    const stepId = re.exec(stepIdPath)![1]

    this.setState({ isSubmitting: true })

    let { data } = await this.props.strategyChoiceMutation({
      variables: {
        originStepId: this.props.match.params.stepId,
        stepId,
        sessionId: cookie.load('session_id'),
      },
    })
    this.setState({ isSubmitting: false })

    if (!data.error) {
      cookie.save(this.props.match.params.stepId, coinsSpent, { path: '/' })
      this.props.history.push(
        `${stepIdPath}?lang=${
          queryString.parse(this.props.location.search).lang
        }&coins_spent=${coinsSpent}`
      )
    } else {
      alert('There was a problem recording your choice.')
    }
  }

  onChange = (selectedItem: any) => {
    this.setState({ selectedItem })
  }

  next = () => {
    this.setState(state => ({
      selectedItem: state.selectedItem + 1,
    }))
  }

  prev = () => {
    this.setState(state => ({
      selectedItem: state.selectedItem - 1,
    }))
  }

  updateCurrentSlide = (index: any) => {
    const { selectedItem } = this.state

    if (selectedItem !== index) {
      this.setState({
        selectedItem: index,
      })
    }
  }

  handleClick = (index: any) => {
    const flippedStates = {
      ...this.state.flippedStates,
      [index]: !this.state.flippedStates[index],
    }
    this.setState({ flippedStates })
  }

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="choose-strategy-view" className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form className="forma" loading={loading}>
            <CustomHeader
              stepId={this.props.match.params.stepId}
              lang={queryString.parse(this.props.location.search).lang}
            />
            <div className="coin-status">
              <h4 className="">{getCoinCount()}</h4>
              <Image className="coin-img" src={coin} />
              <p>remaining</p>
            </div>
            <h4 className="instructions">Choose one of the following strategies.</h4>
            <div className="carousel-holder">
              <Carousel
                showIndicators={false}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
                selectedItem={this.state.selectedItem}
                onChange={this.updateCurrentSlide}
              >
                <ReactCardFlip isFlipped={this.state.flippedStates[0]} flipDirection="horizontal">
                  <div key="front">
                    <div className="content-box">
                      <Button
                        size="large"
                        className="nav prev-btn"
                        disabled
                        circular
                        icon="arrow left"
                        onClick={this.prev}
                      />
                      <Button
                        size="large"
                        className="nav next-btn"
                        circular
                        icon="arrow right"
                        onClick={this.next}
                      />
                      <h4 className="strat-num">Strategy 1</h4>
                      <hr className="divider-line" />
                      <h1 className="">{step && step.publicField2}</h1>
                      <p>{step && step.publicField3}</p>
                      <Grid>
                        <Grid.Column width={8} className="col-left">
                          <Button className="btn secondary" onClick={() => this.handleClick(0)}>
                            Click to flip
                          </Button>
                        </Grid.Column>
                        <Grid.Column width={8} className="col-right">
                          <h2 className="coin-cost">{step && step.publicField6}</h2>
                          <Image className="coin-img" src={coin} />
                        </Grid.Column>
                      </Grid>
                    </div>
                  </div>
                  <div key="back">
                    <div className="content-box">
                      <h1 className="">{step && step.publicField2}</h1>
                      <p className="large">What it is:</p>
                      <p>{step && step.publicField3}</p>
                      <p className="large">Pros:</p>
                      <p>{step && step.publicField4}</p>
                      <p className="large">Cons:</p>
                      <p>{step && step.publicField5}</p>
                      <Button className="btn secondary" onClick={() => this.handleClick(0)}>
                        Flip over
                      </Button>
                    </div>
                  </div>
                </ReactCardFlip>
                <ReactCardFlip
                  isFlipped={this.state.flippedStates[1]}
                  cardZIndex={-100}
                  flipDirection="horizontal"
                >
                  <div key="front">
                    <div className="content-box">
                      <Button
                        size="large"
                        className="nav prev-btn"
                        circular
                        icon="arrow left"
                        onClick={this.prev}
                      />
                      <Button
                        size="large"
                        className="nav next-btn"
                        circular
                        icon="arrow right"
                        onClick={this.next}
                        disabled={
                          parseInt(this.props.match.params.stepId) === 203 ||
                          parseInt(this.props.match.params.stepId) === 403
                        }
                      />
                      <h4 className="strat-num">Strategy 2</h4>
                      <hr className="divider-line" />
                      <h1 className="">{step && step.publicField8}</h1>
                      <p>{step && step.publicField9}</p>
                      <Grid>
                        <Grid.Column width={8} className="col-left">
                          <Button className="btn secondary" onClick={() => this.handleClick(1)}>
                            Click to flip
                          </Button>
                        </Grid.Column>
                        <Grid.Column width={8} className="col-right">
                          <h2 className="coin-cost">{step && step.publicField12}</h2>
                          <Image className="coin-img" src={coin} />
                        </Grid.Column>
                      </Grid>
                    </div>
                  </div>
                  <div key="back">
                    <div className="content-box">
                      <h1 className="">{step && step.publicField8}</h1>
                      <p className="large">What it is:</p>
                      <p>{step && step.publicField9}</p>
                      <p className="large">Pros:</p>
                      <p>{step && step.publicField10}</p>
                      <p className="large">Cons:</p>
                      <p>{step && step.publicField11}</p>
                      <Button className="btn secondary" onClick={() => this.handleClick(1)}>
                        Flip over
                      </Button>
                    </div>
                  </div>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={this.state.flippedStates[2]} flipDirection="horizontal">
                  <div key="front">
                    <div className="content-box">
                      <Button
                        size="large"
                        className="nav prev-btn"
                        circular
                        icon="arrow left"
                        onClick={this.prev}
                      />
                      <Button
                        size="large"
                        className="nav next-btn"
                        circular
                        icon="arrow right"
                        onClick={this.next}
                        disabled
                      />
                      <h4 className="strat-num">Strategy 3</h4>
                      <hr className="divider-line" />
                      <h1 className="">{step && step.publicField14}</h1>
                      <p>{step && step.publicField15}</p>
                      <Grid>
                        <Grid.Column width={8} className="col-left">
                          <Button className="btn secondary" onClick={() => this.handleClick(2)}>
                            Click to flip
                          </Button>
                        </Grid.Column>
                        <Grid.Column width={8} className="col-right">
                          <h2 className="coin-cost">{step && step.publicField18}</h2>
                          <Image className="coin-img" src={coin} />
                        </Grid.Column>
                      </Grid>
                    </div>
                  </div>
                  <div key="back">
                    <div className="content-box">
                      <h1 className="">{step && step.publicField14}</h1>
                      <p className="large">What it is:</p>
                      <p>{step && step.publicField15}</p>
                      <p className="large">Pros:</p>
                      <p>{step && step.publicField16}</p>
                      <p className="large">Cons:</p>
                      <p>{step && step.publicField17}</p>
                      <Button className="btn secondary" onClick={() => this.handleClick(2)}>
                        Flip over
                      </Button>
                    </div>
                  </div>
                </ReactCardFlip>
              </Carousel>
              <div className="custom-btn-holder">
                <Button onClick={this.recordChoiceAndRedirect} className="btn primary">
                  Choose this strategy
                </Button>
              </div>
            </div>
          </Form>
        </Main>
      </div>
    )
  }
}

export default compose(
  graphql(strategyChoiceMutation, { name: 'strategyChoiceMutation' }),
  graphql<Props, StepQueryResponse>(stepQuery, {
    options: (props: OwnProps): QueryOpts<StepQueryParams> => ({
      variables: {
        id: parseInt(props.match.params.stepId),
        lang: queryString.parse(props.location.search).lang
          ? queryString.parse(props.location.search).lang
          : 'en',
        renderMdToHtml: true,
      },
    }),
  })
)(ChooseStrategyView)
