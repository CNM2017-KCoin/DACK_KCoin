import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import RealMoneyIco from 'material-ui/svg-icons/editor/attach-money';
import UsedMoneyIco from 'material-ui/svg-icons/editor/monetization-on';

import AddressIco from 'material-ui/svg-icons/action/code';
import InfoBox from '../components/dashboard/InfoBox';
import RecentTransaction from '../components/dashboard/RecentTransaction';
import globalStyles from '../styles';
import Cookies from 'universal-cookie';
import QRCode from 'qrcode.react';
import Data from '../data';
// import {connect} from 'react-redux';
// import * as actions from './../actions/index.js';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();
    const email = cookies.get('email');
    this.state = { 
      address:"",
      actual_amount: 0,
      available_amount: 0,
      email:email,
      receiverReport: 'Đang xử lý...',
      receiverTrans: []
    }
  }

  getExistEmail() {
  }

  loadData() {
    var self = this;

    
    //send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    // axios.post(apiLink+'/api/transactions', {
    //   "email":self.state.email
    // })
    // .then(function (response) {
    //   console.log(response);
    //   if(response.status ==  200) {
    //     // browserHistory.push('/login');
    //   } else  {
    //     alert('Load failed');
    //   }
    //   return;
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   alert('Load failed', error);
    //   return;
    // });

    axios.post(apiLink+'/api/user-info', {
      "email":self.state.email
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        self.setState({
          address:res.data.address,
          actual_amount: res.data.actual_amount,
          available_amount: res.data.available_amount
        })
      } else  {
        alert('Load failed:', res.data.error);
      }
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert('Load failed', error);
      return;
    });
  }

  loadReceiverData(offset) {
    var self = this;
    console.log(offset+"  "+this.state.email);
  
    //send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/transaction-input', {
      email:self.state.email, 
      offset:offset
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        let receiverReport = 'Đang xử lý...';
        if(res.data.receiver_trans.length == 0) {
          receiverReport = 'Không tìm thấy giao dịch nào';
        }
        self.setState({
          receiverTrans: res.data.receiver_trans,
          receiverReport: receiverReport
        })
      } else  {
        alert('Load users failed:', res.data.error);
      }
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert('Load users failed', error);
      return;
    });
  }

  componentWillReceiveProps() {
    this.loadData();
    this.loadReceiverData(0);
  }

  componentDidMount() {
    this.loadData();
    this.loadReceiverData(0);
  }

  componentWillMount(){

    const cookies = new Cookies();
    const role = cookies.get('role');
    if(this.state.email == "") {
      browserHistory.push('/login');
    }
    else if(role != "user") {
      browserHistory.push('/*');
    }
  }

  render() {
    // const user = this.props.user;
    if(this.state.receiverTrans == null || this.state.receiverTrans.length == 0) {
      return(
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Trang chủ</h3>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
              <InfoBox Icon={RealMoneyIco}
                       color={pink600}
                       title="Số dư thực tế"
                       value={this.state.actual_amount}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
              <InfoBox Icon={UsedMoneyIco}
                       color={purple600}
                       title="Số dư khả dụng"
                       value={this.state.available_amount}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
              <InfoBox Icon={AddressIco}
                       color={orange600}
                       title="Địa chỉ giao dịch"
                       value={this.state.address}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">  
              <h3>Giao dịch nhận tiền</h3>      
              <div>{this.state.receiverReport}</div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15" >
                <QRCode value={this.state.address} size={350}/>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3 style={globalStyles.navigation}>Ví KCoin / Trang chủ</h3>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <InfoBox Icon={RealMoneyIco}
                     color={pink600}
                     title="Số dư thực tế"
                     value={this.state.actual_amount}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <InfoBox Icon={UsedMoneyIco}
                     color={purple600}
                     title="Số dư khả dụng"
                     value={this.state.available_amount}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
            <InfoBox Icon={AddressIco}
                     color={orange600}
                     title="Địa chỉ giao dịch"
                     value={this.state.address}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
            <RecentTransaction data={this.state.receiverTrans} title="Giao dịch nhận tiền"/>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15" >
              <QRCode value={this.state.address} size={350}/>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
