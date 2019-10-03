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
import { constructInnerHTML, getCoinCount } from 'src/Helpers'
import cookie from 'react-cookies'
import Main from 'src/components/Main/'
import CustomHeader from 'src/components/CustomHeader/'
import coin from 'src/images/money.png'
import './style.css'
import {
  translate,
  REMAINING,
  HOW_IT_AFFECTS_BAYVILLE,
  REMAINING_BUDGET,
  YOU_SELECTED,
  BUDGET_WARNING,
  OK_MAYOR_HARD,
} from 'src/Translate'

const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

type State = {
  modalOpen: boolean
}

class StrategyFeedbackView extends React.Component<Props, State> {
  state = {
    modalOpen: false,
  }

  componentDidMount = () => {
    const coinCount = getCoinCount(this.props.match.params.stepId)

    if (coinCount < 0) {
      this.setState({ modalOpen: true })
    }
  }

  processText = (text: string | undefined) => {
    if (!text || !queryString.parse(this.props.location.search).coins_spent) return

    text = text.replace(
      '&lt;coins_spent&gt;',
      queryString.parse(this.props.location.search).coins_spent
    )
    text = text.replace(
      '&lt;coins_left&gt;',
      getCoinCount(this.props.match.params.stepId).toString()
    )
    return text
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="strategy-feedback-view" className="view">
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
            <div className="content-box">
              <h2>
                <span className="you-selected">
                  {translate(queryString.parse(this.props.location.search).lang, YOU_SELECTED)}
                </span>{' '}
                {step && step.publicField1}
              </h2>
              <h3 className="">
                {translate(
                  queryString.parse(this.props.location.search).lang,
                  HOW_IT_AFFECTS_BAYVILLE
                )}
              </h3>
              <p className="large">{step && step.publicField3}</p>
              <h3 className="">
                {translate(queryString.parse(this.props.location.search).lang, REMAINING_BUDGET)}
              </h3>
              <p
                className="large"
                dangerouslySetInnerHTML={constructInnerHTML(
                  this.processText(step && step.publicField4)
                )}
              />
              <div className="custom-btn-holder">
                <Button
                  className="btn primary"
                  as={Link}
                  to={`${step && step.privateField1}?lang=${
                    queryString.parse(this.props.location.search).lang
                  }`}
                >
                  {step && step.publicField5}
                </Button>
              </div>
            </div>
          </Form>
        </Main>
      </div>
    )
  }
}

export default graphql<Props, StepQueryResponse>(stepQuery, {
  options: (props: OwnProps): QueryOpts<StepQueryParams> => ({
    variables: {
      id: parseInt(props.match.params.stepId),
      lang: queryString.parse(props.location.search).lang
        ? queryString.parse(props.location.search).lang
        : 'en',
      renderMdToHtml: true,
    },
  }),
})(StrategyFeedbackView)
