import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import AddTransactionPage from './containers/AddTransactionPage';
import RegisterPage from './containers/RegisterPage';
import TransactionDetailPage from './containers/TransactionDetailPage';
import AllTransactionsPage from './containers/AllTransactionsPage';
import UserDetailPage from './containers/UserDetailPage';
import Dashboard from './containers/DashboardPage';

export default (
  <Route>
    <Route path="register" component={RegisterPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={HomePage}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="addTransaction" component={AddTransactionPage}/>
      <Route path="transactions" component={TransactionDetailPage}/>
      <Route path="all_transactions" component={AllTransactionsPage}/>
      <Route path="all_users" component={UserDetailPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
