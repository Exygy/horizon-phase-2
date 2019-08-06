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
import avatar3 from 'src/images/avatar3.png'
import avatar6 from 'src/images/avatar-3.png'
import avatar23 from 'src/images/avatar-23.png'
import avatar13 from 'src/images/avatar-13.png'
import avatar1 from 'src/images/avatar-1.png'
import avatar21 from 'src/images/avatar-21.png'
import avatar22a from 'src/images/avatar-22a.png'
import avatar16 from 'src/images/avatar-16.png'
import coin from 'src/images/money.png'
import chat from 'src/images/chat.png'
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
    let msg1Avatar = null
    let msg2Avatar = null
    let msg3Avatar = null

    if (parseInt(this.props.match.params.stepId) === 301) {
      msg1Avatar = avatar23
      msg2Avatar = avatar6
    } else if (parseInt(this.props.match.params.stepId) === 501) {
      msg1Avatar = avatar13
      msg2Avatar = avatar1
      msg3Avatar = avatar21
    } else if (parseInt(this.props.match.params.stepId) === 601) {
      msg1Avatar = avatar22a
      msg2Avatar = avatar16
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
                  <Grid.Column width={3}>
                    <Image src={msg1Avatar} />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <p className="sub-heading">{step && step.publicField1}</p>
                    <span className="sub-heading deemphasized">1 min ago</span>
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
                  <Grid.Column width={3}>
                    <Image src={msg1Avatar} />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <p className="sub-heading">{step && step.publicField1}</p>
                    <span className="sub-heading deemphasized">1 min ago</span>
                    <p>{step && step.publicField3}</p>
                    <span className="heart">
                      <Icon name="heart outline" /> 11
                    </span>
                    <span className="retweet">
                      <Icon name="retweet" /> 11
                    </span>
                  </Grid.Column>
                </Grid.Row>
                {step && step.publicField4 && (
                  <Grid.Row className="message">
                    <Grid.Column width={3}>
                      <Image src={msg1Avatar} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <p className="sub-heading">{step && step.publicField1}</p>
                      <span className="sub-heading deemphasized">1 min ago</span>
                      <p>{step && step.publicField4}</p>
                      <span className="heart">
                        <Icon name="heart outline" /> 11
                      </span>
                      <span className="retweet">
                        <Icon name="retweet" /> 11
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
            </div>

            <div className="content-box middle-bottom-msg">
              <Grid>
                <Grid.Row className="message">
                  <Grid.Column width={3}>
                    <Image src={msg2Avatar} />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <p className="sub-heading">{step && step.publicField5}</p>
                    <span className="sub-heading deemphasized">1 min ago</span>
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
                  <Grid.Column width={3}>
                    <Image src={msg2Avatar} />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <p className="sub-heading">{step && step.publicField5}</p>
                    <span className="sub-heading deemphasized">1 min ago</span>
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
                  <Grid.Column width={3}>
                    <Image src={msg2Avatar} />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <p className="sub-heading">{step && step.publicField5}</p>
                    <span className="sub-heading deemphasized">1 min ago</span>
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

            {step && step.publicField10 && (
              <div className="content-box middle-bottom-msg">
                <Grid>
                  <Grid.Row className="message">
                    <Grid.Column width={3}>
                      <Image src={msg3Avatar} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <p className="sub-heading">{step && step.publicField9}</p>
                      <span className="sub-heading deemphasized">1 min ago</span>
                      <p>{step && step.publicField10}</p>
                      <span className="heart">
                        <Icon name="heart outline" /> 11
                      </span>
                      <span className="retweet">
                        <Icon name="retweet" /> 11
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="message">
                    <Grid.Column width={3}>
                      <Image src={msg3Avatar} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <p className="sub-heading">{step && step.publicField9}</p>
                      <span className="sub-heading deemphasized">1 min ago</span>
                      <p>{step && step.publicField11}</p>
                      <span className="heart">
                        <Icon name="heart outline" /> 11
                      </span>
                      <span className="retweet">
                        <Icon name="retweet" /> 11
                      </span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="message">
                    <Grid.Column width={3}>
                      <Image src={msg3Avatar} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <p className="sub-heading">{step && step.publicField9}</p>
                      <span className="sub-heading deemphasized">1 min ago</span>
                      <p>{step && step.publicField12}</p>
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
            )}
            <div className="btn-holder">
              <Button
                className="btn secondary gameplay action"
                as={Link}
                to={`${step && step.privateField1}?lang=${
                  queryString.parse(this.props.location.search).lang
                }`}
              >
                <Image avatar src={chat} />
                <span>{step && step.publicField13}</span>
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
