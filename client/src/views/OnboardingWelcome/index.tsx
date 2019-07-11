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
import { constructInnerHTML } from 'src/Helpers'
import cookie from 'react-cookies'


const uuidv4 = require('uuid/v4');
const queryString = require('query-string');

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class OnboardingWelcomeView extends React.Component<Props, {}> {
  // NOTE: The session ID gets created here and gets used down the line. 
  // This will overwrite an existing session ID - this is done on purpose.
  componentDidMount = () => {
      cookie.save('session_id', uuidv4(), { path: '/' })
  }

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="onboarding-welcome-view">
        <div className="top-header">
            <h3>Mayor of Bayville</h3>
        </div>
        <div className="main">
            <div className="content">
                <h1 className="">{step && step.publicField1}</h1>
                <br/>
                <p className="large" dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField2)}/>
                <div className="btn-holder">
                    <Button className="btn primary" as={Link} to='/onboarding/challenges/10001'>{step && step.publicField3}</Button>
                </div>
            </div>
        </div>
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
})(OnboardingWelcomeView)
