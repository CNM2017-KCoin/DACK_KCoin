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
import Data from '../data';

class AddTransactionPage extends React.Component {

  constructor(props) {
    super(props)

    const cookies = new Cookies();
    const email = cookies.get('email');
    this.state = { 
      email: email,
      receiver_address:'',
      amount:'',
      errorTxtEmail: '',
      errorTxtAddress: '',
      errorTxtAmount: ''
    }
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
      this.setState ({ 
        errorTxtAddress: '', 
        errorTxtAmount: ''
      });
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
        width: '50%'
      }
    };

    return (
      <PageBase title="Khởi tạo giao dịch"
                navigation="Ví KCoin / Khởi tạo giao dịch">
        <form>

          <TextField
              id="receiver_email"
              style = {styles.receiver_email}
              hintText="Input Receiver Email (Optional)"
              floatingLabelText="Receiver Email"
              errorText= {this.state.errorTxtEmail}
              fullWidth={true}/>
          <RaisedButton label="Tìm địa chỉ"
              style={styles.saveButton}
              onClick={(event) => this.handleFindClick(event)}
              primary={true}/>

          <TextField
            id="receiver_address"
            hintText="Receiver Address"
            floatingLabelText="Receiver Address"
            fullWidth={true}
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