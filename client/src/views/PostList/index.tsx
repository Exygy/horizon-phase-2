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

const queryString = require('query-string');
const stepQuery = gql`
  query step($id: ID, $lang: String, $renderMdToHtml: Boolean) {
    step(id: $id, lang: $lang, renderMdToHtml: $renderMdToHtml) {
      id
      title
      description
      callToAction
    }
  }
`

type StepRouteParams = {
  stepId: string
}

type StepQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  renderMdToHtml: boolean
}

type StepQueryResponse = {
  step: {
    title: string
    description: string
    callToAction: string
  }
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class PostListView extends React.Component<Props, {}> {
  componentDidMount = () => {
  }

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="about-view">
        <Helmet>
          <title>Test</title>
        </Helmet>
        <h1 dangerouslySetInnerHTML={step && {'__html': step.title}}></h1>
        <p dangerouslySetInnerHTML={step && {'__html': step.description}}></p>
        <br/>
        <p dangerouslySetInnerHTML={step && {'__html': step.callToAction}}></p>
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
})(PostListView)
