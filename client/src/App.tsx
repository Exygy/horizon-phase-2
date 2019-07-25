import ApolloClient from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import PostListView from './views/PostList/index'
import ScenarioView from './views/Scenario/index'
import CharacterView from './views/Character/index'
import MakeDecisionView from './views/MakeDecision/index'
import ChooseStrategyView from './views/ChooseStrategy/index'
import StrategyFeedbackView from './views/StrategyFeedback/index'
import SummaryView from './views/Summary/index'
import ChatDialogueView from './views/ChatDialogue/index'
import OnboardingWelcome from './views/OnboardingWelcome/index'
import OnboardingChallenges from './views/OnboardingChallenges/index'
import OnboardingFuture from './views/OnboardingFuture/index'
import OnboardingElected from './views/OnboardingElected/index'
import OnboardingYourChallenge from './views/OnboardingYourChallenge/index'
import OnboardingSurvey from './views/OnboardingSurvey/index'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import cookie from 'react-cookies'

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NODE_ENV === 'production' ? '/gql' : 'http://localhost:5000/graphql/',
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

const RequiresCookieRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props => {
      if (!cookie.load('session_id'))
        return <Redirect to={`/onboarding/welcome/10000${props.location.search}`} />
      return <Component {...props} />
    }}
  />
)

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="custom">
          <Route exact path="/onboarding/welcome/:stepId" component={OnboardingWelcome} />
          <RequiresCookieRoute
            exact
            path="/onboarding/challenges/:stepId"
            component={OnboardingChallenges}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/future/:stepId"
            component={OnboardingFuture}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/elected/:stepId"
            component={OnboardingElected}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/your-challenge/:stepId"
            component={OnboardingYourChallenge}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/survey/:stepId"
            component={OnboardingSurvey}
          />
          <RequiresCookieRoute exact path="/kitchensink" component={PostListView} />
          <RequiresCookieRoute exact path="/scenario/:stepId" component={ScenarioView} />
          <RequiresCookieRoute exact path="/character/:stepId" component={CharacterView} />
          <RequiresCookieRoute exact path="/make-decision/:stepId" component={MakeDecisionView} />
          <RequiresCookieRoute
            exact
            path="/choose-strategy/:stepId"
            component={ChooseStrategyView}
          />
          <RequiresCookieRoute
            exact
            path="/strategy-feedback/:stepId"
            component={StrategyFeedbackView}
          />
          <RequiresCookieRoute exact path="/summary/:stepId" component={SummaryView} />
          <RequiresCookieRoute exact path="/chat-dialogue/:stepId" component={ChatDialogueView} />
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
