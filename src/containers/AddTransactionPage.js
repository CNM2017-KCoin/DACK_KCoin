import React from 'react';
import { render } from 'react-dom';
// import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Cookies from 'universal-cookie';
import Data from '../data';

class AddTransactionPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      errorTxtAddress: '',
      errorTxtAmount: ''
    }
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
  // handleClick(event){
  //   const email = document.getElementById('email').value;
  //   const amount = document.getElementById('amount').value;

  //   if(email == "" || amount == "") {
  //     alert('input to text box');
  //     return;
  //   }

  //   const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
  //   axios.post(apiLink+'/users/'+Data.user.email, {
  //     "emailReceiver":email,
  //     "amountTransaction":parseInt(amount)
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     if(response.status == 200){
  //       alert('Add Transaction Successfully');
  //     } else if(response.status == 304) {
  //       alert('Money is not enough');
  //     } else if(response.status == 305) {
  //       alert('Email receiver is not exist');
  //     }
  //     browserHistory.push('/transactionDetail');
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     alert('Add Transaction failed');
  //   });
  //  }
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

  handleClick(event) {

    const txtAddress = document.getElementById('receiver_address');
    const txtAmount = document.getElementById('amount');

    if(txtAddress.value == "") {
      this.setState({ errorTxtAddress: 'Address is required' })
      return;
    }
    if(txtAmount.value == "") {
      this.setState({ errorTxtAmount: 'Amount is required' })
      return;
    }


    browserHistory.push('/transactions');
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
      }
    };

    return (
      <PageBase title="Add Transaction"
                navigation="Application / Add Transaction">
        <form>

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
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>

            <RaisedButton label="Submit"
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
