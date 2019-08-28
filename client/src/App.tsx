import ApolloClient from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import ScenarioView from './views/Scenario/index'
import CharacterView from './views/Character/index'
import MakeDecisionView from './views/MakeDecision/index'
import ChooseStrategyView from './views/ChooseStrategy/index'
import StrategyFeedbackView from './views/StrategyFeedback/index'
import SummaryView from './views/Summary/index'
import ChatDialogueView from './views/ChatDialogue/index'
import OnboardingWelcomeView from './views/OnboardingWelcome/index'
import OnboardingChallengesView from './views/OnboardingChallenges/index'
import OnboardingFutureView from './views/OnboardingFuture/index'
import OnboardingElectedView from './views/OnboardingElected/index'
import OnboardingYourChallengeView from './views/OnboardingYourChallenge/index'
import OnboardingSurveyView from './views/OnboardingSurvey/index'
import OnboardingChooseCategoryView from './views/OnboardingChooseCategory/index'
import IntroductionView from './views/Introduction/index'
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
      if (!cookie.load('session_id')) return <Redirect to={`/`} />
      return <Component {...props} />
    }}
  />
)

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="custom">
          <Route exact path="/" component={IntroductionView} />
          <Route exact path="/onboarding/welcome/:stepId" component={OnboardingWelcomeView} />
          <RequiresCookieRoute
            exact
            path="/onboarding/challenges/:stepId"
            component={OnboardingChallengesView}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/future/:stepId"
            component={OnboardingFutureView}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/elected/:stepId"
            component={OnboardingElectedView}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/your-challenge/:stepId"
            component={OnboardingYourChallengeView}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/survey/:stepId"
            component={OnboardingSurveyView}
          />
          <RequiresCookieRoute
            exact
            path="/onboarding/choose-category/:stepId"
            component={OnboardingChooseCategoryView}
          />
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
