import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Data from '../data';

class AddTransactionPage extends React.Component {

  handleClick(event){
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    if(email == "" || amount == "") {
      alert('input to text box');
      return;
    }

    const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
    axios.post(apiLink+'/users/'+Data.user.email, {
      "emailReceiver":email,
      "amountTransaction":parseInt(amount)
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        alert('Add Transaction Successfully');
      } else if(response.status == 304) {
        alert('Money is not enough');
      } else if(response.status == 305) {
        alert('Email receiver is not exist');
      }
      browserHistory.push('/transactionDetail');
    })
    .catch(function (error) {
      console.log(error);
      alert('Add Transaction failed');
    });
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
            id="email"
            hintText="Email receiver"
            floatingLabelText="Email receiver"
            fullWidth={true}
          />

          <TextField
            id="amount"
            hintText="Amount"
            floatingLabelText="Amount"
            fullWidth={true}
          />

          <Divider/>

          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>

            <RaisedButton label="Save"
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
