import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PostListView from "./views/PostList/index"
import ScenarioView from "./views/Scenario/index"
import CharacterView from "./views/Character/index"
import ChooseStrategyView from "./views/ChooseStrategy/index"
import './App.css'
import 'semantic-ui-css/semantic.min.css'


const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/gql"
      : "http://localhost:5000/graphql/"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="custom">
          <Route exact path="/scenario" component={ScenarioView} />
          <Route exact path="/character" component={CharacterView} />
          <Route exact path="/choose-strategy" component={ChooseStrategyView} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
