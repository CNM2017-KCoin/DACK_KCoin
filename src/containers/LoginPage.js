import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import TextField from 'material-ui/TextField';
import ThemeDefault from '../theme-default';
import Data from '../data';

const Utils = require('../services/utils');

class LoginPage extends React.Component {

  // handleClick(event){
  //   const email = document.getElementById('email').value;
  //   const password = document.getElementById('password').value;
    
  //   if(email == "" || password == "") {
  //     alert("Fill in text box");
  //     return;
  //   }

  //   console.log(email);
  //   console.log(password);
  //   const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
  //   axios.post(apiLink+'/users/checklogin', {
  //     "email":email,
  //     "password":password
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     if(response.status == 200){
  //       alert("Login successful");
  //       Data.user.email = email;
  //       browserHistory.push('/dashboard');
  //       return;
  //     }
  //     else{
  //       alert("Login failed");
  //       browserHistory.push('/login');
  //       return;
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     alert('Login failed', error);
  //     return;
  //   });
  //  }
  handleClick(event) {
    const message = "pass here";

    var address = Utils.hash(message).toString('hex');
    console.log(address);

  }

  render() {

  const styles = {
    loginContainer: {
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
    },
    buttonsDiv: {
      textAlign: 'center',
      padding: 10
    },
    flatButton: {
      color: grey500
    },
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    },
    loginBtn: {
      float: 'right'
    },
    btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      margin: 2,
      fontSize: 13
    },
    btnSpan: {
      marginLeft: 5
    },
  };
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>

              <form>
                <TextField
                  id="email"
                  hintText="test@gmail.com"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                />
                <TextField
                  id="password"
                  hintText="test"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                />

                <div>
                  <FlatButton
                    label="Register"
                    href="/register"
                    style={styles.flatButton}
                    icon={<PersonAdd />}
                  />    

                  <RaisedButton label="Login"
                    primary={true}
                    onClick={(event) => this.handleClick(event)}
                    style={styles.loginBtn}/>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default LoginPage;
