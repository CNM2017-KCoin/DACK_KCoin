import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
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
      errorTxtAddress: '',
      errorTxtAmount: '',
      errorTxtVertifyPass: '',
      errorTxtCode: '',
      open:false
    }
  }

  // handleOpenVertify = () => {
  //   this.setState({open: true});
  // };

  // postTransaction = (event) => {
  //   const txtVertifyPass = document.getElementById('vertify_pass');
  //   const txtCode = document.getElementById('code');

  //   if(txtVertifyPass.value == "") {
  //     this.setState({ errorTxtVertifyPass: 'Vertify Password is required' })
  //     return;
  //   }
  //   if(txtCode.value == "") {
  //     this.setState({ errorTxtCode: 'Code is required' })
  //     return;
  //   }

  //   //post transaction
  //   const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
  //   axios.post(apiLink+'/send', {
  //     code: txtCode.value,
  //     password: txtVertifyPass.value,
  //     email: this.state.email,
  //     receiver_address: this.state.receiver_address,
  //     amount: this.state.amount
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     if(response.data.status == 200){
  //       alert('Gửi giao dịch thành công!');
  //     } else if(response.status == 400) {
  //       alert('Số dư trong tài khoản không đủ để thực hiện giao dịch');
  //     } else {
  //       alert('Giao dịch không thành công');
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     alert('Giao dịch thất bại');
  //   });

  //   this.setState({open: false});
  //   browserHistory.push('/transactions');
  // };

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

    //send vertify request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/create-transaction', {
      email: self.state.email,
      receiver_address: txtAddress.value,
      amout: txtAmount.value
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status == 200){
        alert('Khởi tạo giao dịch thành công!');
        browserHistory.push('/transactions');
        // this.setState({
        //   receiver_address: txtAddress.value,
        //   amount: txtAmount.value
        // })
        // this.handleOpenVertify();

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

  // onDialogChange(event, newValue) {
  //   if (event.target.value == '') {
  //     switch(event.target.id) {
  //       case 'vertify_pass': {
  //         this.setState({ errorTxtVertifyPass: 'Vertify Password is required' });
  //         return;
  //       }
  //       case 'code': {
  //         this.setState({ errorTxtCode: 'Code is required' });
  //         return;
  //       }
  //     }
  //   } else {
  //     this.setState ({ 
  //       errorTxtVertifyPass: '', 
  //       errorTxtCode: ''
  //     });
  //   }
  // }

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

    // var context =  (
    //   <form>
    //     <TextField
    //       id="vertify_pass"
    //       hintText="Vertify Password"
    //       floatingLabelText="Vertify Password"
    //       fullWidth={true}
    //       type="password"
    //       errorText= {this.state.errorTxtVertifyPass}
    //       onChange={this.onDialogChange.bind(this)}
    //     />

    //     <TextField
    //       id="code"
    //       hintText="Code"
    //       floatingLabelText="Code"
    //       fullWidth={true}
    //       errorText= {this.state.errorTxtCode}
    //       onChange={this.onDialogChange.bind(this)}
    //     />

    //     <Divider/>

    //     <div style={styles.buttons}>
    //       <Link to="/transactions">
    //         <RaisedButton label="Thoát"/>
    //       </Link>

    //       <RaisedButton label="Gửi"
    //         style={styles.saveButton}
    //         onClick={(event) => this.postTransaction(event)}
    //         primary={true}/>
    //     </div>
    //   </form>
    // );

    return (
      <PageBase title="Khởi tạo giao dịch"
                navigation="Ví KCoin / Khởi tạo giao dịch">
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


        // <Dialog
        //   title="Xác nhận giao dịch"
        //   modal={true}
        //   open={this.state.open}>
        //   <div>Vui lòng kiểm tra email để lấy mã xác nhận cho giao dịch</div>
        //   {context}
        // </Dialog>