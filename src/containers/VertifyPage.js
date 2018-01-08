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

class VertifyPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      errorTxtVertifyCode: ''
    }
  }

  onChange(event, newValue) {
    if (event.target.value == '') {
      switch(event.target.id) {
        case 'vertifyCode': {
          this.setState({ errorTxtVertifyCode: 'Vertify Password is required' });
          return;
        }
      }
    } else {
      this.setState ({ 
        errorTxtVertifyCode: ''
      });
    }
  }

  handleClick(event) {

    const txtVertifyCode = document.getElementById('vertifyCode');

    
    if(txtVertifyCode.value == "") {
      this.setState({ errorTxtVertifyCode: 'Vertify Code is required' })
      return;
    }

    let email = this.props.location.query.email;
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/vertify', {
      email:email,
      code:txtVertifyCode.value
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        alert('Vertify Successfully');
        browserHistory.push('/login');
      } else  {
        alert('Vertify Failed');
      }
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert('Vertify failed: ', error);
      return;
    });

    // browserHistory.push('/login');

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
                  id="vertifyCode"
                  hintText="Vertify Code"
                  floatingLabelText="Vertify Code"
                  fullWidth={true}
                  errorText= {this.state.errorTxtVertifyCode}
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

export default VertifyPage;
