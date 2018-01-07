import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import RealMoneyIco from 'material-ui/svg-icons/editor/attach-money';
import UsedMoneyIco from 'material-ui/svg-icons/editor/monetization-on';

import AddressIco from 'material-ui/svg-icons/action/code';
import InfoBox from '../components/dashboard/InfoBox';
import RecentTransaction from '../components/dashboard/RecentTransaction';
import globalStyles from '../styles';
import Cookies from 'universal-cookie';
import Pager from 'react-pager';
import Data from '../data';
// import {connect} from 'react-redux';
// import * as actions from './../actions/index.js';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);

    this.state = {
      total_users:0,
      total_actual_amount: 0,
      total_available_amount: 0,
      showCheckboxes: false,
      total:       5,
      current:     1,
      visiblePages: 1
    }
  }


  handlePageChanged (newPage) {
    console.log(newPage);
    this.setState({ 
      current: newPage
    });
  };

  // loadData() {
  //   var self = this;
  //
  //
  //   //send request
  //   const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
  //   // axios.post(apiLink+'/api/transactions', {
  //   //   "email":this.getExistEmail()
  //   // })
  //   // .then(function (response) {
  //   //   console.log(response);
  //   //   if(response.status ==  200) {
  //   //     // browserHistory.push('/login');
  //   //   } else  {
  //   //     alert('Load failed');
  //   //   }
  //   //   return;
  //   // })
  //   // .catch(function (error) {
  //   //   console.log(error);
  //   //   alert('Load failed', error);
  //   //   return;
  //   // });
  //
  //   axios.post(apiLink+'/api/user-info', {
  //     "email":this.getExistEmail()
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     if(response.data.status ==  200) {
  //       var res = response.data;
  //       self.setState({
  //         address:res.data.address,
  //         actual_amount: res.data.actual_amount,
  //         available_amount: res.data.available_amount
  //       })
  //     } else  {
  //       alert('Load failed:', res.data.error);
  //     }
  //     return;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     alert('Load failed', error);
  //     return;
  //   });
  // }
  //
  // componentWillReceiveProps() {
  //   this.loadData();
  // }
  //
  // componentDidMount() {
  //   this.loadData();
  // }

  componentWillMount(){

    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    if(email == "") {
      browserHistory.push('/login');
    }
    else if(role != "Admin") {
      browserHistory.push('/*');
    }
  }

  render() {
    const styles = {
      columnsTable: {
        email: {
          width: '20%'
        },
        address: {
          width: '30%'
        },
        actual_amount: {
          width: '25%'
        },
        available_amount: {
          width: '25%'
        }
      }
    }
    // const user = this.props.user;
    const admin = Data.admin;
    const users = admin.users;
    if(admin == null) {
      return(<div>The responsive it not here yet!</div>);
    }
    return (
      <div>
        <h3 style={globalStyles.navigation}>Ví KCoin / Trang chủ</h3>

        <div className="row">

          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 m-b-15 ">
            <InfoBox Icon={RealMoneyIco}
                     color={pink600}
                     title="Tổng số dư thực tế"
                     value={admin.total_actual_amount}
            />
          </div>

          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 m-b-15 ">
            <InfoBox Icon={UsedMoneyIco}
                     color={purple600}
                     title="Tổng số dư khả dụng"
                     value={admin.total_available_amount}
            />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 m-b-15 ">
            <InfoBox Icon={AddressIco}
                     color={orange600}
                     title="Tổng số người dùng"
                     value={admin.total_users}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
            <Paper style={globalStyles.paper}>
              <h3 style={globalStyles.title}>Danh sách người dùng</h3>

              <div>
                <Table>
                  <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                displaySelectAll={this.state.showCheckboxes}>
                    <TableRow>
                      <TableHeaderColumn style={styles.columnsTable.email}>Email</TableHeaderColumn>
                      <TableHeaderColumn style={styles.columnsTable.address}>Địa chỉ</TableHeaderColumn>
                      <TableHeaderColumn style={styles.columnsTable.actual_amount}>Số dư khả dụng</TableHeaderColumn>
                      <TableHeaderColumn style={styles.columnsTable.available_amount}>Số dư thực tế</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                    {admin.users.map(item => 
                        <TableRow key={item._id}>
                          <TableRowColumn style={styles.columnsTable.email}>{item.email}</TableRowColumn>
                          <TableRowColumn style={styles.columnsTable.address}>{item.address}</TableRowColumn>
                          <TableRowColumn style={styles.columnsTable.actual_amount}>{item.actual_amount}</TableRowColumn>
                          <TableRowColumn style={styles.columnsTable.available_amount}>{item.available_amount}</TableRowColumn>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="row">
                <Pager
                  total={this.state.total}
                  current={this.state.current}
                  visiblePages={this.state.visiblePages}
                  titles={{ first: '<|', last: '>|' }}
                  className="pagination-sm pull-right"
                  onPageChanged={this.handlePageChanged}
                />
              </div>
              <div style={globalStyles.clear}/>
            </Paper>
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
// export default connect (mapStateToProps)(DashboardPage);
export default DashboardPage;
