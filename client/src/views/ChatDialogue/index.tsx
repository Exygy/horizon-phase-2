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
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Transition,
} from 'semantic-ui-react'
import Main from 'src/components/Main/'
import CustomHeader from 'src/components/CustomHeader/'
import { getCoinCount, constructInnerHTML } from 'src/Helpers'
import person6 from 'src/images/person6.png'
import person7 from 'src/images/avatar-3.png'
import coin from 'src/images/money.png'
import './style.css'
import { stepQuery } from 'src/Queries'
import { StepQueryParams, Step, StepQueryResponse, StepRouteParams } from 'src/Types'

const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class ChatDialogueView extends React.Component<Props, {}> {
  componentDidMount = () => {}

  render() {
    const { step, loading } = this.props.data
    let personImg = null

    if (parseInt(this.props.match.params.stepId) === 101) {
      personImg = person6
    }

    return (
      <div id="chat-dialogue-view" className="view">
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
            <div className="content-box top-msg">
              <Grid>
                <Grid.Row className="message">
                  <Grid.Column width={4}>
                    <Image src={person6} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p className="sub-heading">{step && step.publicField1}</p>
                    <p>{step && step.publicField2}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="message">
                  <Grid.Column width={4}>
                    <Image src={person6} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p className="sub-heading">{step && step.publicField1}</p>
                    <p>{step && step.publicField3}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="message">
                  <Grid.Column width={4}>
                    <Image src={person6} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p className="sub-heading">{step && step.publicField1}</p>
                    <p>{step && step.publicField4}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>

            <div className="content-box bottom-msg">
              <Grid>
                <Grid.Row className="message">
                  <Grid.Column width={4}>
                    <Image src={person7} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p className="sub-heading">{step && step.publicField5}</p>
                    <p>{step && step.publicField6}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="message">
                  <Grid.Column width={4}>
                    <Image src={person7} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p className="sub-heading">{step && step.publicField5}</p>
                    <p>{step && step.publicField7}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="message">
                  <Grid.Column width={4}>
                    <Image src={person7} />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <p className="sub-heading">{step && step.publicField5}</p>
                    <p>{step && step.publicField8}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div className="btn-holder">
              <Button
                className="btn primary"
                as={Link}
                to={`${step && step.privateField1}?lang=${
                  queryString.parse(this.props.location.search).lang
                }`}
              >
                {step && step.publicField13}
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
})(ChatDialogueView)
