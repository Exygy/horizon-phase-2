import React, { MouseEvent } from 'react'
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
import { constructInnerHTML, clearCoinCookies } from 'src/Helpers'
import CustomHeader from 'src/components/CustomHeader/'
import Main from 'src/components/Main/'
import { MOB, translate } from 'src/Translate'
import './style.css'
import mtc from 'src/images/mtc.png'
import abag from 'src/images/abag.png'
import cookie from 'react-cookies'

const uuidv4 = require('uuid/v4')
const queryString = require('query-string')

type OwnProps = RouteComponentProps<StepRouteParams>
type StepQueryProps = ChildDataProps<StepQueryParams, StepQueryResponse>
type Props = StepQueryProps & OwnProps

type State = {
  extendedDescriptionVisible: boolean
}

class IntroductionView extends React.Component<Props, State> {
  state = {
    extendedDescriptionVisible: false,
  }

  // NOTE: The session ID gets created here and gets used down the line.
  // This will overwrite an existing session ID - this is done on purpose so
  // that a person can replay the game with a fresh state
  componentDidMount = () => {
    cookie.save('session_id', uuidv4(), { path: '/' })
    clearCoinCookies()
  }

  handleExtraDescription = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    this.setState({ extendedDescriptionVisible: !this.state.extendedDescriptionVisible })
  }

  render() {
    const { step, loading } = this.props.data
    const { extendedDescriptionVisible } = this.state

    return (
      <div id="introduction-view" className="view">
        <Main stepId={'20000'}>
          <Form className="forma" loading={loading}>
            <CustomHeader stepId={'20000'} lang={'en'} />
            <div className="content-box cb-top">
              <h1 className="">{step && step.publicField1}</h1>
              <br />
              <p
                className="large"
                dangerouslySetInnerHTML={constructInnerHTML(step && step.publicField2)}
              />
              <h3>{step && step.publicField3}</h3>
              <div className="lang-btn">
                <Button className="btn primary" as={Link} to={`/onboarding/welcome/10000?lang=en`}>
                  {step && step.publicField4}
                </Button>
              </div>
              <div className="lang-btn">
                <Button className="btn primary" as={Link} to={`/onboarding/welcome/10000?lang=es`}>
                  {step && step.publicField5}
                </Button>
              </div>
              <div className="lang-btn">
                <Button className="btn primary" as={Link} to={`/onboarding/welcome/10000?lang=cn`}>
                  {step && step.publicField6}
                </Button>
              </div>
            </div>
            <div className="content-box cb-bottom">
              <h1 className="">{step && step.publicField7}</h1>
              <br />
              <p>{step && step.publicField8}</p>
              {!extendedDescriptionVisible && (
                <a href="#" onClick={this.handleExtraDescription}>
                  Read more
                </a>
              )}
              {extendedDescriptionVisible && (
                <>
                  <p>{step && step.publicField9}</p>
                  <a href="#" onClick={this.handleExtraDescription}>
                    Read less
                  </a>
                </>
              )}
              <br />
              <br />
              <Image className="" src={mtc} />
              <Image className="" src={abag} />
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
      id: 20000,
      lang: 'en',
      renderMdToHtml: true,
    },
  }),
})(IntroductionView)
