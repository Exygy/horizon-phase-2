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
import cookie from 'react-cookies'
import Main from 'src/components/Main/'
import CustomHeader from 'src/components/CustomHeader/'
import { getCoinCount, constructInnerHTML } from 'src/Helpers'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import ReactCardFlip from 'react-card-flip';
import coin from 'src/images/money.png'


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
    isFlipped: boolean
}

class ChooseStrategyView extends React.Component<Props, State> {
      state = {
        isSubmitting: false,
          isFlipped: false
      }

  componentDidMount = () => {
  }

  recordChoiceAndRedirect = async (stepIdPath: string | undefined, fullPath:string, coinsSpent: string | undefined) => {
      if (!stepIdPath || ! coinsSpent)
          return

      // Separate step ID from path
      const re = /\/[\-\w]+\/([\d]+)/
      const stepId = re.exec(stepIdPath)![1]

    this.setState({ isSubmitting: true })

    let { data } = await this.props.strategyChoiceMutation({
        variables: { originStepId: this.props.match.params.stepId, stepId, sessionId: cookie.load('session_id')},
    })
    this.setState({ isSubmitting: false })

    if (!data.error) {
        cookie.save(this.props.match.params.stepId, coinsSpent, { path: '/' })
        this.props.history.push(fullPath)
    }

    else {
        alert("There was a problem recording your choice.")
    }
  }

    x = () => {
        this.setState({isFlipped: !this.state.isFlipped})
    }

  render() {
    const { step, loading, } = this.props.data
          var settings = {
      speed: 500,
     infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div id="choose-strategy-view" className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form
            className="forma"
            loading={loading}
          >
        <CustomHeader stepId={this.props.match.params.stepId} lang={queryString.parse(this.props.location.search).lang}/>
            <div className="coin-status" onClick={this.x}>
                <h4 className="">{getCoinCount()}</h4>
                <Image className="coin-img" src={coin}/>
                <p>remaining</p>
            </div>
            <p>Choose one of the following strategies</p>
        <div id="slider">
              <Slider {...settings}>
        <div>
              <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">

            <div className="content-box centered" key='front'>
                <h1 className="">{step && step.publicField1}</h1>
                <Button className="btn primary" as={Link} to={`${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}`}>{step && step.publicField2}</Button>
            </div>
            <div className="content-box centered" key='back'>
                <h1 className="">{step && step.publicField1}</h1>
                <Button className="btn primary" as={Link} to={`${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}`}>{step && step.publicField2}</Button>
            </div>
              </ReactCardFlip>

        </div>
        <div>
        <img src="http://placekitten.com/g/400/200" />
        </div>
        <div>
        <img src="http://placekitten.com/g/400/200" />
        </div>
      </Slider>
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
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
      renderMdToHtml: true
    },
  }),
}))(ChooseStrategyView)
