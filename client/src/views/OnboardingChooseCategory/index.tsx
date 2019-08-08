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
import CustomHeader from 'src/components/CustomHeader/'
import Main from 'src/components/Main/'
import { MOB, HOUSING, ECONOMY, TRANSPORATION, ENVIRONMENT, translate } from 'src/Translate'
import './style.css'

const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class OnboardingChooseCategoryView extends React.Component<Props, {}> {
  componentDidMount = () => {}

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="onboarding-choose-category-view" className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form className="forma" loading={loading}>
            <CustomHeader
              stepId={this.props.match.params.stepId}
              lang={queryString.parse(this.props.location.search).lang}
            />
            <div className="top-text">
              <h1 className="">{step && step.publicField1}</h1>
              <p
                className="large"
                dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField2)}
              />
            </div>
            <a
              className="pill housing"
              onClick={() =>
                this.props.history.push(
                  `/scenario/100?lang=${queryString.parse(this.props.location.search).lang}`
                )
              }
              href="#"
            >
              <h2>{translate(queryString.parse(this.props.location.search).lang, HOUSING)}</h2>
            </a>
            <a
              className="pill transportation"
              onClick={() =>
                this.props.history.push(
                  `/scenario/900?lang=${queryString.parse(this.props.location.search).lang}`
                )
              }
              href="#"
            >
              <h2>
                {translate(queryString.parse(this.props.location.search).lang, TRANSPORATION)}
              </h2>
            </a>
            <a
              className="pill economy"
              onClick={() =>
                this.props.history.push(
                  `/scenario/400?lang=${queryString.parse(this.props.location.search).lang}`
                )
              }
              href="#"
            >
              <h2>{translate(queryString.parse(this.props.location.search).lang, ECONOMY)}</h2>
            </a>
            <a
              className="pill environment"
              onClick={() =>
                this.props.history.push(
                  `/scenario/600?lang=${queryString.parse(this.props.location.search).lang}`
                )
              }
              href="#"
            >
              <h2>{translate(queryString.parse(this.props.location.search).lang, ENVIRONMENT)}</h2>
            </a>
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
})(OnboardingChooseCategoryView)
