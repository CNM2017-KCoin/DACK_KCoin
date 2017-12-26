import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {pink600, purple600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboard/InfoBox';
import RecentTransaction from '../components/dashboard/RecentTransaction';
import globalStyles from '../styles';
import Data from '../data';
import {connect} from 'react-redux';
import * as actions from './../actions/index.js';

class DashboardPage extends React.Component {
  loadData() {
    var self = this;
    const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
    axios.get(apiLink+'/users/'+Data.user.email)
    .then(function (response) {
      console.log(response.data);
      self.props.dispatch(actions.getData(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillReceiveProps() {
    this.loadData();
  }

  componentDidMount() {
    this.loadData();
  }


  render() {
    const user = this.props.user;
    // const user = Data.user;
    if(user.transactions == null) {
      return(<div>The responsive it not here yet!</div>);
    }
    return (
      <div>
        <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <InfoBox Icon={ShoppingCart}
                     color={pink600}
                     title="Total Money"
                     value={user.amountWallet+''}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <InfoBox Icon={Assessment}
                     color={purple600}
                     title="Total transaction"
                     value={user.transactions.length+''}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
            <RecentTransaction data={user.transactions}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    user: state.mainReducer.user
  };
}
export default connect (mapStateToProps)(DashboardPage);
// export default DashboardPage;
