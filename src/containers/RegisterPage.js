import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import ThemeDefault from '../theme-default';

import Data from '../data';
const Utils = require('../services/utils');

class RegisterPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      errorTxtPass: '', 
      errorTxtEmail: '',
      errorTxtVertifyPass: ''
    }
  }

  onChange(event, newValue) {
    if (event.target.value == '') {
      switch(event.target.id) {
        case 'email': {
          this.setState({ errorTxtEmail: 'Email is required' });
          return;
        }
        case 'password': {
          this.setState({ errorTxtPass: 'Password is required' });
          return;
        }
        case 'vertifyPass': {
          this.setState({ errorTxtVertifyPass: 'Vertify Password is required' });
          return;
        }
      }
    } else {
      this.setState ({ 
        errorTxtPass: '', 
        errorTxtEmail: '',
        errorTxtVertifyPass: ''
      });
    }
  }

  handleClick(event) {

    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');
    const txtVertifyPass = document.getElementById('vertifyPass');

    if(txtEmail.value == "") {
      this.setState({ errorTxtEmail: 'Email is required' })
      return;
    }
    if(txtPassword.value == "") {
      this.setState({ errorTxtPass: 'Password is required' })
      return;
    }
    if(txtVertifyPass.value == "") {
      this.setState({ errorTxtVertifyPass: 'Vertify Password is required' })
      return;
    }

    if(txtPassword.value != txtVertifyPass.value) {
      this.setState({ errorTxtVertifyPass: 'Wrong Vertify!' })
      return;
    }
    var passwordHash = Utils.hash(txtPassword.value).toString('hex');
    // send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/register', {
      "email":txtEmail.value,
      "password":passwordHash
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        alert('Register Successfully');
        browserHistory.push('/login');
      } else  {
        alert('Register Failed: Email was registered');
      }
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert('Register failed: ', error);
      return;
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
      },loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
      <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>

              <form>
                <TextField
                  id="email"
                  hintText="Email"
                  floatingLabelText="Email"
                  fullWidth={true}
                  errorText= {this.state.errorTxtEmail}
                  onChange={this.onChange.bind(this)}
                />

                <TextField
                  id="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  type = "password"
                  fullWidth={true}
                  errorText= {this.state.errorTxtPass}
                  onChange={this.onChange.bind(this)}
                />
                
                <TextField
                  id="vertifyPass"
                  hintText="Vertify Password"
                  floatingLabelText="Vertify Password"
                  type = "password"
                  fullWidth={true}
                  errorText= {this.state.errorTxtVertifyPass}
                  onChange={this.onChange.bind(this)}
                />

                <Divider/>

                <div style={styles.buttons}>
                  <Link to="/login">
                    <RaisedButton label="Cancel"/>
                  </Link>

                  <RaisedButton label="Submit"
                      style={styles.saveButton}
                      onClick={(event) => this.handleClick(event)}
                      primary={true}/>
                </div>
              </form>

            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RegisterPage;
