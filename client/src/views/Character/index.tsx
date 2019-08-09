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
import Main from 'src/components/Main/'
import CustomHeader from 'src/components/CustomHeader/'
import { getCoinCount, constructInnerHTML } from 'src/Helpers'
import person from 'src/images/person6.png'
import coin from 'src/images/money.png'
import chat from 'src/images/chat.png'
import avatar19 from 'src/images/avatar-19.png'
import avatar7 from 'src/images/avatar-7.png'
import avatar18 from 'src/images/avatar-18.png'
import avatar15 from 'src/images/avatar-15.png'
import avatar3 from 'src/images/avatar-3.png'
import avatar9 from 'src/images/avatar-9.png'
import avatar14 from 'src/images/avatar-14.png'
import avatar10 from 'src/images/avatar-10.png'
import avatar22b from 'src/images/avatar-22b.png'
import avatar11 from 'src/images/avatar-11.png'
import avatar17 from 'src/images/avatar-17.png'
import avatar20 from 'src/images/avatar-20.png'
import avatar2 from 'src/images/avatar-2.png'
import { stepQuery } from 'src/Queries'
import { StepQueryParams, Step, StepQueryResponse, StepRouteParams } from 'src/Types'
import './style.css'

const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class CharacterView extends React.Component<Props, {}> {
  componentDidMount = () => {}

  render() {
    const { step, loading } = this.props.data
    let personImg = null

    if (parseInt(this.props.match.params.stepId) === 101) {
      personImg = avatar15
    } else if (parseInt(this.props.match.params.stepId) === 201) {
      personImg = avatar3
    } else if (parseInt(this.props.match.params.stepId) === 202) {
      personImg = avatar9
    } else if (parseInt(this.props.match.params.stepId) === 401) {
      personImg = avatar14
    } else if (parseInt(this.props.match.params.stepId) === 801) {
      personImg = avatar19
    } else if (parseInt(this.props.match.params.stepId) === 802) {
      personImg = avatar7
    } else if (parseInt(this.props.match.params.stepId) === 803) {
      personImg = avatar18
    } else if (parseInt(this.props.match.params.stepId) === 901) {
      personImg = avatar10
    } else if (parseInt(this.props.match.params.stepId) === 1001) {
      personImg = avatar22b
    } else if (parseInt(this.props.match.params.stepId) === 1002) {
      personImg = avatar11
    } else if (parseInt(this.props.match.params.stepId) === 1003) {
      personImg = avatar17
    } else if (parseInt(this.props.match.params.stepId) === 1101) {
      personImg = avatar20
    } else if (parseInt(this.props.match.params.stepId) === 701) {
      personImg = avatar2
    }

    return (
      <div id="choose-scenario-view" className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form className="forma" loading={loading}>
            <CustomHeader
              stepId={this.props.match.params.stepId}
              lang={queryString.parse(this.props.location.search).lang}
            />
            <div className="coin-status">
              <h4 className="">{getCoinCount(this.props.match.params.stepId)}</h4>
              <Image className="coin-img" src={coin} />
              <p>remaining</p>
            </div>
            <div className="content-box">
              <div className="cb-holder">
                <Image className="person" src={personImg} />
                <h1 className="">{step && step.publicField1}</h1>
                <p
                  className="large"
                  dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField2)}
                />
              </div>
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
                {step && step.publicField3}
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
})(CharacterView)
