import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Edit from "./components/book/Edit";
import Create from "./components/book/Create";
import Show from "./components/book/Show";

const client = new ApolloClient({ uri: "http://localhost:3000/graphql" });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/create" component={Create} />
        <Route path="/show/:id" component={Show} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
