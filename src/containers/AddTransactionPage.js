import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import PageBase from '../components/PageBase';
import Cookies from 'universal-cookie';
import AutoComplete from 'material-ui/AutoComplete';
import Data from '../data';

class AddTransactionPage extends React.Component {

  constructor(props) {
    super(props)

    const cookies = new Cookies();
    const email = cookies.get('email');
    const password = cookies.get('password');
    this.state = { 
      recentEmailList: [],
      email: email,
      password: password,
      receiver_address:'',
      amount:'',
      errorTxtEmail: '',
      errorTxtAddress: '',
      errorTxtAmount: ''
    }
  }

  loadEmailList() {
    var self = this; 
    //send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';

    axios.post(apiLink+'/api/find-recent-emails', {
      email:self.state.email,
      password: self.state.password
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        var arr = res.data.emailList;
        var newArr = [];
        for (var i = arr.length - 1; i >= 0; i--) {
          newArr.push(arr[i].old_email);
        }
        self.setState({
          recentEmailList:newArr
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

  componentWillReceiveProps() {
    this.loadEmailList();
  }

  componentDidMount() {
    this.loadEmailList();
  }

  handleClick(event) {

    var self = this;

    const txtAddress = document.getElementById('receiver_address');
    const txtAmount = document.getElementById('amount');

    if(txtAddress.value == "") {
      this.setState({ errorTxtAddress: 'Address is required' })
      return;
    }
    if(txtAmount.value == "" || parseInt(txtAmount.value) <= 0) {
      this.setState({ errorTxtAmount: 'Amount is required and larger than 0' })
      return;
    }

    //create transaction
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/create-transaction', {
      email: self.state.email,
      password: self.state.password,
      receiver_address: txtAddress.value,
      amount: txtAmount.value
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status == 200){
        alert('Khởi tạo giao dịch thành công!');
        browserHistory.push('/transactions');

      } else {
        alert('Khởi tạo giao dịch thất bại');
        return;
      }

    })
    .catch(function (error) {
      console.log(error);
      alert('Giao dịch thất bại');
    });

  }

  handleFindClick(event) {

    const txtEmail = document.getElementById('receiver_email');
    const txtAddress = document.getElementById('receiver_address');

    if(txtEmail.value == "") {
      this.setState({ errorTxtEmail: 'Input email to find address' })
      return;
    }

    var self = this;

    //find address
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/find-address', {
      email: self.state.email,
      password: self.state.password,
      receiver_email: txtEmail.value
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data.status == 200){
        self.setState({
          receiver_address:response.data.data.address
        })
      } else {
        this.setState({ errorTxtEmail: 'Email does not exist!' })
        return;
      }

    })
    .catch(function (error) {
      alert('Thao tác thất bại');
    });

  }

  onChange(event, newValue) {

    if (event.target.value == '') {
      switch(event.target.id) {
        case 'receiver_address': {
          this.setState({ errorTxtAddress: 'Address is required' });
          return;
        }
        case 'amount': {
          this.setState({ errorTxtAmount: 'Amount is required' });
          return;
        }
      }
    } else {
      switch(event.target.id) {
        case 'receiver_address': { 
          this.setState ({ 
            receiver_address: event.target.value,
            errorTxtAddress: '',
            errorTxtAmount: ''
          });
          return;
        }
        case 'amount': {       
          this.setState ({ 
            errorTxtAddress: '', 
            errorTxtAmount: ''
          });
          return;
        }
      }
    }
  }

  componentWillMount(){

    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    if(email == "") {
      browserHistory.push('/login');
    }
    else if(role != "user") {
      browserHistory.push('/*');
    }
  }

  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      },
      receiver_email: {
        width: '80%'
      }
    };

    const emailList = [
      {
        'email':'red1',
        'address':'123'
      },
      {
        'email':'Orange',
        'address':'1235'
      },
      {
        'email':'vuquang3101@gmail.com',
        'address':'1235'
      }
    ];

    return (
      <PageBase title="Khởi tạo giao dịch"
                navigation="Ví KCoin / Khởi tạo giao dịch">
        <form>

          <AutoComplete
                id="receiver_email"
                style = {styles.receiver_email}
                floatingLabelText="Type Receiver Email (Optional)" 
                errorText= {this.state.errorTxtEmail}
                filter={AutoComplete.caseInsensitiveFilter}
                fullWidth={true}
                dataSource={this.state.recentEmailList}/>

          <RaisedButton label="Tìm địa chỉ"
              style={styles.saveButton}
              onClick={(event) => this.handleFindClick(event)}
              primary={true}/>

          <TextField
            id="receiver_address"
            hintText="Receiver Address"
            floatingLabelText="Receiver Address"
            fullWidth={true}
            value = {this.state.receiver_address}
            errorText= {this.state.errorTxtAddress}
            onChange={this.onChange.bind(this)}
          />

          <TextField
            id="amount"
            hintText="Amount"
            floatingLabelText="Amount"
            fullWidth={true}
            type="number"
            errorText= {this.state.errorTxtAmount}
            onChange={this.onChange.bind(this)}
          />

          <Divider/>

          <div style={styles.buttons}>
            <Link to="/transactions">
              <RaisedButton label="Thoát"/>
            </Link>

            <RaisedButton label="Khởi tạo"
              style={styles.saveButton}
              onClick={(event) => this.handleClick(event)}
              primary={true}/>
          </div>
        </form>
      </PageBase>
    );
  };
}

export default AddTransactionPage;