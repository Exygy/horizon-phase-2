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
import person6 from 'src/images/person6.png'
import './style.css'

const queryString = require('query-string');
const stepQuery = gql`
  query step($id: ID, $lang: String, $renderMdToHtml: Boolean) {
    step(id: $id, lang: $lang, renderMdToHtml: $renderMdToHtml) {
      id
      publicField1
      publicField2
      publicField3
      privateField1
    },
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

type Step = {
    publicField1: string
    publicField2: string
    publicField3: string
    privateField1: string
}

type StepQueryResponse = {
  step: Step,
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class MakeDecisionView extends React.Component<Props, {}> {
  componentDidMount = () => {
  }

  render() {
    const { step, loading } = this.props.data
      let personImg = null

      if (parseInt(this.props.match.params.stepId) === 101) {
          personImg = person6
      }

    return (
      <div id="make-decision-view" className="view">
        <Main stepId={this.props.match.params.stepId}>
          <Form
            className="forma"
            loading={loading}
          >
        <CustomHeader stepId={this.props.match.params.stepId} lang={queryString.parse(this.props.location.search).lang}/>
            <div className="coin-status">
                <h4 className="">{getCoinCount()}</h4>
                <Image avatar src='http://icons.iconarchive.com/icons/cornmanthe3rd/metronome/256/Communication-email-green-icon.png'/>
                <p>remaining</p>
            </div>
            <div className="content-box centered">
                <h1 className="">{step && step.publicField1}</h1>
                <Button className="btn primary" as={Link} to={`${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}`}>{step && step.publicField2}</Button>
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
})(MakeDecisionView)
