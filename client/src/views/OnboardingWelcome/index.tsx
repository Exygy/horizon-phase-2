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
import { stepQuery } from 'src/Queries'
import { StepQueryParams, Step, StepQueryResponse, StepRouteParams } from 'src/Types'
import { constructInnerHTML } from 'src/Helpers'
import { MOB, translate } from 'src/Translate'
import cookie from 'react-cookies'
import CustomHeader from 'src/components/CustomHeader/'
import Main from 'src/components/Main/'

const uuidv4 = require('uuid/v4')
const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class OnboardingWelcomeView extends React.Component<Props, {}> {
  render() {
    const { step, loading } = this.props.data

    return (
      <div className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form className="forma" loading={loading}>
            <CustomHeader
              stepId={this.props.match.params.stepId}
              lang={queryString.parse(this.props.location.search).lang}
            />
            <div className="content-box">
              <h1 className="">{step && step.publicField1}</h1>
              <br />
              <p
                className="large"
                dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField2)}
              />
              <div className="btn-holder">
                <Button
                  className="btn primary"
                  as={Link}
                  to={`/onboarding/challenges/10001?lang=${
                    queryString.parse(this.props.location.search).lang
                  }`}
                >
                  {step && step.publicField3}
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
})(OnboardingWelcomeView)
