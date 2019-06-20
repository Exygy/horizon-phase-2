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
import person6 from 'src/images/person6.png'

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
      <Container id="about-view">
        <Helmet>
          <title>Test</title>
        </Helmet>
        <h1 className="slate">header 1</h1>
        <h2 className="slate">header 2</h2>
        <h3 className="slate" >header 3</h3>
        <h4 className="slate"> header 4</h4>
        <div className="sub-heading">sub heading </div>
        <div className="sub-heading deemphasized">sub heading second</div>
        <p className="large">large paragraph</p>
        <p className="">normal paragraph</p>
        <a href="#" className="link">link</a>
        <hr/>
        <h1 className="mustard">mustard header 1</h1>
        <p className="large teal">teal large paragraph</p>
        <Button className="btn primary">This is a primary button</Button>
        <br/>
        <br/>
        <Button className="btn secondary">This is a secondary button</Button>
        <br/>
        <br/>
        <Button className="btn secondary gameplay action">
            <Image avatar src='http://icons.iconarchive.com/icons/cornmanthe3rd/metronome/256/Communication-email-green-icon.png'/>
            <span>"Tell me more"</span>
        </Button>
        <br/>
        <br/>
        <Button className="btn secondary gameplay">
            <Image avatar src='http://icons.iconarchive.com/icons/cornmanthe3rd/metronome/256/Communication-email-green-icon.png'/>
            <span>Review desk files</span>
        </Button>
        <br/>
        <br/>
        <div className="card">
            <div className="top">
                <Image src={person6}/>
                <h2>Test text</h2>
            </div>
            <div className="bottom">
                <p className="large">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <Button className="btn secondary gameplay">
                    <Image avatar src='http://icons.iconarchive.com/icons/cornmanthe3rd/metronome/256/Communication-email-green-icon.png'/>
                    <span>Review desk files</span>
                </Button>
            </div>
        </div>
        <br/>
        <br/>
      </Container>
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
