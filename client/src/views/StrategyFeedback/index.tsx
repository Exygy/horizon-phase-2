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
import Main from 'src/components/Main/'
import CustomHeader from 'src/components/CustomHeader/'
import coin from 'src/images/money.png'
import './style.css'

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
      <div id="strategy-feedback-view" className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form
            className="forma"
            loading={loading}
          >
        <CustomHeader stepId={this.props.match.params.stepId} lang={queryString.parse(this.props.location.search).lang}/>
            <div className="coin-status">
                <h4 className="">{getCoinCount()}</h4>
                <Image className="coin-img" src={coin}/>
                <p>remaining</p>
            </div>
            <div className="content-box">
                <h2 className=""><span className="you-selected">You selected</span> {step && step.publicField1}</h2>
                <h3 className="">How it affects Bayville</h3>
                <p className='large'>{step && step.publicField3}</p>
                <h3 className="">Remaining budget</h3>
                <p className="large" dangerouslySetInnerHTML={constructInnerHTML(this.processText(step && step.publicField4))}/>
            </div>
            <div className="custom-btn-holder">
                <Button className="btn primary" as={Link} to={`${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}`}>{step && step.publicField5}</Button>
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
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
      renderMdToHtml: true
    },
  }),
})(StrategyFeedbackView)
