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
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Message,
  Responsive,
  Segment,
  Sidebar,
  Transition,
} from 'semantic-ui-react'
import {
  Form, Input
} from 'formsy-semantic-ui-react';
import {stepQuery} from 'src/Queries'
import {StepQueryParams, Step, StepQueryResponse, StepRouteParams} from 'src/Types'
import { constructInnerHTML } from 'src/Helpers'
import cookie from 'react-cookies'

const queryString = require('query-string');

type State = {
  isSubmitting: boolean
  name: string
  errorMsg: string
}

const surveyMutation = gql`
  mutation createSurveyResponse($name: String!, $sessionId: UUID!) {
    createSurveyResponse(name: $name, sessionId: $sessionId) {
      error
    }
  }
`
type SurveyMutationResponse = {
  error: string
}

type SurveyMutationParams = {
  name: string
  sessionId: string
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse> & {
    surveyMutation: Function
}
type Props = StepQueryProps & OwnProps

class OnboardingSurveyView extends React.Component<Props, State> {
      state = {
        isSubmitting: false,
        name: '',
        errorMsg: '',
      }

  componentDidMount = () => {
  }

  onValidSubmit = async () => {
    this.setState({ errorMsg: '', isSubmitting: true })
    const { name, } = this.state

    let { data } = await this.props.surveyMutation({
        variables: { name, sessionId: cookie.load('session_id')},
    })
    this.setState({ isSubmitting: false })

    if (!data.createSurveyResponse.error) {
        alert("Thank you. Your response has been submitted.")
    } else {
      this.setState({ errorMsg: 'There was an error submitting your survey.' })
    }
  }

  onFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.currentTarget
    const newVal = type === 'checkbox' ? checked : value
    this.setState(prevState => ({
      ...prevState,
      [name]: newVal,
    }))
  }


  render() {
    const { step, loading } = this.props.data
    const { isSubmitting, errorMsg } = this.state

    return (
      <Container id="onboarding-welcome-view">
        <h1 className="slate">{step && step.publicField1}</h1>
        <p dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField2)}/>
                      <Form
                        className=""
                        loading={isSubmitting}
                        onValidSubmit={this.onValidSubmit}
                        error={errorMsg ? true : false}
                      >
                        <Message error header="Oops" content={errorMsg} />
                        <Form.Input
                          name="name"
                          label="Name"
                          required
                          onChange={this.onFieldChange}
                        />
                        <Button content={step && step.publicField6} size="large" disabled={isSubmitting} />
                      </Form>
      </Container>
    )
  }
}

export default compose(
    graphql(surveyMutation, { name: 'surveyMutation' }),
    graphql<Props, StepQueryResponse>(stepQuery, {
  options: (props: OwnProps): QueryOpts<StepQueryParams> => ({
    variables: {
      id: parseInt(props.match.params.stepId),
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
      renderMdToHtml: true
    },
  }),
}))(OnboardingSurveyView)
