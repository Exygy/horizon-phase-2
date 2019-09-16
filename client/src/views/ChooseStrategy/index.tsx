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
  Modal,
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
import {
  STRATEGY_1,
  STRATEGY_2,
  STRATEGY_3,
  CHOOSE_THIS_STRATEGY,
  FLIP_FOR_MORE,
  CHOOSE_ONE_OF_THE,
  FOLLOWING_STRATEGIES,
  REMAINING,
  VIEW_MORE,
  FLIP_BACK,
  BUDGET_WARNING,
  OK_MAYOR_HARD,
  translate,
} from 'src/Translate'

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
  modalOpen: boolean
}

class ChooseStrategyView extends React.Component<Props, State> {
  state = {
    isSubmitting: false,
    isFlipped: false,
    selectedItem: 0,
    flippedStates: [],
    modalOpen: false,
  }

  componentDidMount = () => {
    const coinCount = getCoinCount(this.props.match.params.stepId)

    if (coinCount === 100) {
      this.setState({ modalOpen: true })
    }
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
      cookie.save(`strat-${this.props.match.params.stepId}`, coinsSpent, { path: '/' })
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

  handleClose = () => {
    this.setState({ modalOpen: false })
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
              <h4 className="">{getCoinCount(this.props.match.params.stepId)}</h4>
              <Image className="coin-img" src={coin} />
              <p>{translate(queryString.parse(this.props.location.search).lang, REMAINING)}</p>
            </div>
            <h4 className="instructions">
              {translate(queryString.parse(this.props.location.search).lang, CHOOSE_ONE_OF_THE)}
              <br />
              {translate(queryString.parse(this.props.location.search).lang, FOLLOWING_STRATEGIES)}
            </h4>
            <Modal
              open={this.state.modalOpen}
              closeIcon
              onClose={this.handleClose}
              className="warning-modal"
            >
              <Modal.Content>
                <h3 id="special-h3">
                  {translate(queryString.parse(this.props.location.search).lang, BUDGET_WARNING)}
                </h3>
                <hr id="special-divider" />
                <Form loading={loading}>
                  <p id="special-p">{step && step.publicField19}</p>
                </Form>
                <div id="special-btn-holder">
                  <Button id="special-btn" onClick={this.handleClose}>
                    {translate(queryString.parse(this.props.location.search).lang, OK_MAYOR_HARD)}
                  </Button>
                </div>
              </Modal.Content>
            </Modal>
            <div className="carousel-holder">
              <Carousel
                showIndicators={false}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
                swipeable={false}
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
                      <h4 className="strat-num">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_1)}
                      </h4>
                      <hr className="divider-line" />
                      <h1 className="">{step && step.publicField2}</h1>
                      <p>{step && step.publicField3}</p>
                      <p className="view-more">
                        <a href="#" onClick={() => this.handleClick(0)}>
                          {translate(queryString.parse(this.props.location.search).lang, VIEW_MORE)}
                          <Icon className="arrow-right" name="long arrow alternate right" />
                        </a>
                      </p>
                    </div>
                    <div className="content-box-bottom">
                      <div className="col-left">
                        <h2 className="coin-cost">{step && step.publicField6}</h2>
                        <Image className="coin-img" src={coin} />
                      </div>
                      <div className="col-right">
                        <Button className="btn secondary" onClick={this.recordChoiceAndRedirect}>
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            CHOOSE_THIS_STRATEGY
                          )}
                        </Button>
                      </div>
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
                    </div>
                    <div className="content-box-bottom">
                      <div className="col-left">
                        <h2 className="coin-cost">{step && step.publicField6}</h2>
                        <Image className="coin-img" src={coin} />
                      </div>
                      <div className="col-right">
                        <Button className="btn secondary" onClick={() => this.handleClick(0)}>
                          {translate(queryString.parse(this.props.location.search).lang, FLIP_BACK)}
                        </Button>
                      </div>
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
                          parseInt(this.props.match.params.stepId) === 403 ||
                          parseInt(this.props.match.params.stepId) === 307 ||
                          parseInt(this.props.match.params.stepId) === 607 ||
                          parseInt(this.props.match.params.stepId) === 703
                        }
                      />
                      <h4 className="strat-num">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_2)}
                      </h4>
                      <hr className="divider-line" />
                      <h1 className="">{step && step.publicField8}</h1>
                      <p>{step && step.publicField9}</p>
                      <p className="view-more">
                        <a href="#" onClick={() => this.handleClick(1)}>
                          {translate(queryString.parse(this.props.location.search).lang, VIEW_MORE)}
                          <Icon className="arrow-right" name="long arrow alternate right" />
                        </a>
                      </p>
                    </div>
                    <div className="content-box-bottom">
                      <div className="col-left">
                        <h2 className="coin-cost">{step && step.publicField12}</h2>
                        <Image className="coin-img" src={coin} />
                      </div>
                      <div className="col-right">
                        <Button className="btn secondary" onClick={this.recordChoiceAndRedirect}>
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            CHOOSE_THIS_STRATEGY
                          )}
                        </Button>
                      </div>
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
                    </div>
                    <div className="content-box-bottom">
                      <div className="col-left">
                        <h2 className="coin-cost">{step && step.publicField12}</h2>
                        <Image className="coin-img" src={coin} />
                      </div>
                      <div className="col-right">
                        <Button className="btn secondary" onClick={() => this.handleClick(1)}>
                          {translate(queryString.parse(this.props.location.search).lang, FLIP_BACK)}
                        </Button>
                      </div>
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
                      <h4 className="strat-num">
                        {translate(queryString.parse(this.props.location.search).lang, STRATEGY_3)}
                      </h4>
                      <hr className="divider-line" />
                      <h1 className="">{step && step.publicField14}</h1>
                      <p>{step && step.publicField15}</p>
                      <p className="view-more">
                        <a href="#" onClick={() => this.handleClick(2)}>
                          {translate(queryString.parse(this.props.location.search).lang, VIEW_MORE)}
                          <Icon className="arrow-right" name="long arrow alternate right" />
                        </a>
                      </p>
                    </div>
                    <div className="content-box-bottom">
                      <div className="col-left">
                        <h2 className="coin-cost">{step && step.publicField18}</h2>
                        <Image className="coin-img" src={coin} />
                      </div>
                      <div className="col-right">
                        <Button className="btn secondary" onClick={this.recordChoiceAndRedirect}>
                          {translate(
                            queryString.parse(this.props.location.search).lang,
                            CHOOSE_THIS_STRATEGY
                          )}
                        </Button>
                      </div>
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
                    </div>
                    <div className="content-box-bottom">
                      <div className="col-left">
                        <h2 className="coin-cost">{step && step.publicField18}</h2>
                        <Image className="coin-img" src={coin} />
                      </div>
                      <div className="col-right">
                        <Button className="btn secondary" onClick={() => this.handleClick(2)}>
                          {translate(queryString.parse(this.props.location.search).lang, FLIP_BACK)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </ReactCardFlip>
              </Carousel>
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
