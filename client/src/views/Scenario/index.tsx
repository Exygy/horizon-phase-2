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
import {getProgress} from 'src/Helpers'
import CustomHeader from 'src/components/CustomHeader/'
import Main from 'src/components/Main/'
import { getCoinCount, constructInnerHTML } from 'src/Helpers'

const queryString = require('query-string');
const stepQuery = gql`
  query step($id: ID, $lang: String, $renderMdToHtml: Boolean) {
    step(id: $id, lang: $lang, renderMdToHtml: $renderMdToHtml) {
      id
      publicField1
      publicField2
      privateField1
    },
  }
`

type StepQueryParams = {
  id: number
  lang: 'en' | 'es' | 'cn'
  renderMdToHtml: boolean
}

type Step = {
    publicField1: string
    publicField2: string
    privateField1: string
}

type StepQueryResponse = {
    step: Step
}

type StepRouteParams = {
    stepId: string
}

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

class ScenarioView extends React.Component<Props, {}> {
  componentDidMount = () => {
  }

  render() {
    const { step, loading } = this.props.data

    return (
      <div id="scenario-view" className="view">
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
            <div className="content-box bottom">
                <p className="large" dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField1)}/>
                <div className="btn-holder bottom">
                    <Button className="btn secondary gameplay action" as={Link} to={`${step && step.privateField1}?lang=${queryString.parse(this.props.location.search).lang}`}>
                        <Image avatar src='http://icons.iconarchive.com/icons/cornmanthe3rd/metronome/256/Communication-email-green-icon.png'/>
                        <span>{step && step.publicField2}</span>
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
      lang: queryString.parse(props.location.search).lang ? queryString.parse(props.location.search).lang : "en",
      renderMdToHtml: true
    },
  }),
})(ScenarioView)
