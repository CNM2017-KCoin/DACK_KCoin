import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import AddTransactionPage from './containers/AddTransactionPage';
import RegisterPage from './containers/RegisterPage';
import TransactionDetailPage from './containers/TransactionDetailPage';
import Dashboard from './containers/DashboardPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="addTransaction" component={AddTransactionPage}/>
      <Route path="transactionDetail" component={TransactionDetailPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
