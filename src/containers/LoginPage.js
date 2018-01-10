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
import Cookies from 'universal-cookie';
import LinearProgress from 'material-ui/LinearProgress';
import Data from '../data';

const Utils = require('../services/utils');

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      errorTxtEmail: '',
      errorTxtPass: '',
      isLoading: false
    }
  }

  componentWillMount(){

    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    if(email != "") {
      if(role == "admin") {
        browserHistory.push('/all_users');
      } else if(role == "user"){
        browserHistory.push('/dashboard');
      }
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
      }
    } else {
      this.setState ({ 
        errorTxtPass: '', 
        errorTxtEmail: ''
      });
    }
  }

  handleClick(event) {

    const txtEmail = document.getElementById('email');
    const txtPassword = document.getElementById('password');

    if(txtEmail.value == "") {
      this.setState({ errorTxtEmail: 'Email is required' })
      return;
    }
    if(txtPassword.value == "") {
      this.setState({ errorTxtPass: 'Password is required' })
      return;
    }

    var passwordHash = Utils.hash(txtPassword.value).toString('hex');

    let self = this;
    self.setState ({
      isLoading: true
    })
    //send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/login', {
      "email":txtEmail.value,
      "password":passwordHash
    })
    .then(function (response) {
      console.log(response);
      self.setState ({
          isLoading: false
        })
      if(response.data.status == 200) {
        alert('Đăng nhập thành công!');
        let role = response.data.data.role.toLowerCase();//admin/user
        const cookies = new Cookies();
        cookies.set('email', txtEmail.value, { path: '/' });
        cookies.set('password', passwordHash, { path: '/' });
        cookies.set('role', role, { path: '/' });
        if(role == "admin") {
          browserHistory.push('/all_users');
        } else if(role == "user"){
          browserHistory.push('/dashboard');
        }
      } else  {
        alert('Đăng nhập thất bại!', response.data.error);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('Login failed', error);
    });

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

    let loadingItem = {};
    if(this.state.isLoading) {
      loadingItem = (<LinearProgress mode="indeterminate" />);
    } else {
      loadingItem = (<div></div>);
    }

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            {loadingItem}
            <Paper style={styles.paper}>
              <form>
                <TextField
                  id="email"
                  hintText="Email"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                  type="email"
                  errorText= {this.state.errorTxtEmail}
                  onChange={this.onChange.bind(this)}
                />
                <TextField
                  id="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  errorText= {this.state.errorTxtPass}
                  onChange={this.onChange.bind(this)}
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
