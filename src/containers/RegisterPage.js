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

class RegisterPage extends React.Component {

  handleClick(event){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const vertifyPass = document.getElementById('vertifyPass').value;

    if(name == "" || email=="" || password=="" || vertifyPass=="") {
      alert('Input to text fields');
      return;
    }
    
    if(password != vertifyPass) {
      alert('Vertify password failed');
      return;
    }
    
    const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
    axios.post(apiLink+'/users', {
      "name":name,
      "email":email,
      "password":password,
      "transactions":[]
    })
    .then(function (response) {
      console.log(response);
      alert('Register Successfully');
      browserHistory.push('/login');
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert('Register failed', error);
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
                  id="name"
                  hintText="Name"
                  floatingLabelText="Name"
                  fullWidth={true}
                />
                <TextField
                  id="email"
                  hintText="Email"
                  floatingLabelText="Email"
                  fullWidth={true}
                />

                <TextField
                  id="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  type = "password"
                  fullWidth={true}
                />
                
                <TextField
                  id="vertifyPass"
                  hintText="Vertify Password"
                  floatingLabelText="Vertify Password"
                  type = "password"
                  fullWidth={true}
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
