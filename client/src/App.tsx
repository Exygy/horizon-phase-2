import ApolloClient from "apollo-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import PostListView from "./views/PostList/index"
import ScenarioView from "./views/Scenario/index"
import CharacterView from "./views/Character/index"
import MakeDecisionView from "./views/MakeDecision/index"
import ChooseStrategyView from "./views/ChooseStrategy/index"
import StrategyFeedbackView from "./views/StrategyFeedback/index"
import SummaryView from "./views/Summary/index"
import OnboardingWelcome from "./views/OnboardingWelcome/index"
import OnboardingChallenges from "./views/OnboardingChallenges/index"
import OnboardingFuture from "./views/OnboardingFuture/index"
import OnboardingElected from "./views/OnboardingElected/index"
import OnboardingYourChallenge from "./views/OnboardingYourChallenge/index"
import OnboardingSurvey from "./views/OnboardingSurvey/index"
import './App.css'
import 'semantic-ui-css/semantic.min.css'


const client = new ApolloClient({
    link: new HttpLink({uri:
    process.env.NODE_ENV === "production"
      ? "/gql"
      : "http://localhost:5000/graphql/"}),
     cache: new InMemoryCache(),
      defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="custom">
          <Route exact path="/kitchensink" component={PostListView} />
          <Route exact path="/scenario/:stepId" component={ScenarioView} />
          <Route exact path="/character/:stepId" component={CharacterView} />
          <Route exact path="/make-decision/:stepId" component={MakeDecisionView} />
          <Route exact path="/choose-strategy/:stepId" component={ChooseStrategyView} />
          <Route exact path="/strategy-feedback/:stepId" component={StrategyFeedbackView} />
          <Route exact path="/summary/:stepId" component={SummaryView} />
          <Route exact path="/onboarding/welcome/:stepId" component={OnboardingWelcome} />
          <Route exact path="/onboarding/challenges/:stepId" component={OnboardingChallenges} />
          <Route exact path="/onboarding/future/:stepId" component={OnboardingFuture} />
          <Route exact path="/onboarding/elected/:stepId" component={OnboardingElected} />
          <Route exact path="/onboarding/your-challenge/:stepId" component={OnboardingYourChallenge} />
          <Route exact path="/onboarding/survey/:stepId" component={OnboardingSurvey} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
