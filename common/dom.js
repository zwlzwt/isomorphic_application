import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// page component
import Home from './pages/home';
import User from './pages/userInfoPage';

// actions
import { userInfoAction } from './actions/userAction'

// redirect include from to status(3**)
const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={
      ({ staticContext }) => {
        if (staticContext) {
          staticContext.status = status;
        }
        return <Redirect from={from} to={to} />
      }
    }
  />
);

// 传递status给服务端
const Status = ({ code, children }) => (
  <Route
    render={
      ({ staticContext }) => {
        if (staticContext) {
          staticContext.status = code;
        }
        return children
       }
    }
  />
);

// 404 page
const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, we can't find page!</h1>
    </div>
  </Status>
);

// 页面route match
export const staticPrefix = '/page';

export const routes = [
  {
    path: `${staticPrefix}/user`,
    component: User,
    exact: true,
  },
  {
    path: `${staticPrefix}/home`,
    component: Home,
    exact: true,
  },
];


const App = () => (
  <Switch>
    {
      routes.map((route, index) => (
        <Route {...route} key={index} />
      ))
    }
    <RedirectWithStatus from='/page/fuck' to='/page/home' status={301} exact />
    <Route component={NotFound} />
  </Switch>
);

export default App;
