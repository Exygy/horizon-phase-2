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
import CustomHeader from 'src/components/CustomHeader/'
import Main from 'src/components/Main/'
import { getCoinCount, constructInnerHTML } from 'src/Helpers'
import coin from 'src/images/money.png'
import chat from 'src/images/chat.png'
import { stepQuery } from 'src/Queries'
import { StepQueryParams, Step, StepQueryResponse, StepRouteParams } from 'src/Types'
import './style.css'
import { REMAINING, translate } from 'src/Translate'

const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class ScenarioView extends React.Component<Props, {}> {
  componentDidMount = () => {}

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="scenario-view" className="view">
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
            <div className="content-box bottom">
              <p
                className="large"
                dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField1)}
              />
            </div>
            <div className="btn-holder-bottom">
              <Button
                className="btn secondary gameplay action"
                as={Link}
                to={`${step && step.privateField1}?lang=${
                  queryString.parse(this.props.location.search).lang
                }`}
              >
                <Image avatar src={chat} />
                <span>{step && step.publicField2}</span>
              </Button>
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
})(ScenarioView)
