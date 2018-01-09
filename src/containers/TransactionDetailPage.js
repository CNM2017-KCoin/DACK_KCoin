import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Cookies from 'universal-cookie';
import Data from '../data';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import ActiveIco from 'material-ui/svg-icons/action/done';
import CancelIco from 'material-ui/svg-icons/content/clear';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Pager from 'react-pager';
import {connect} from 'react-redux';
// import * as actions from './../actions/index.js';
import globalStyles from '../styles';

const Utils = require('../services/utils');

class TransactionDetailPage extends React.Component {
  constructor(props) {
      super(props);
      this.handleSenderPageChanged = this.handleSenderPageChanged.bind(this);
      this.handleReceiverPageChanged = this.handleReceiverPageChanged.bind(this);
      const cookies = new Cookies();
      const email = cookies.get('email');
      const role = cookies.get('role');
      this.state = {
        email: email,
        role: role,
        currentItem: {},
        receiver_trans: [],
        sender_trans: [],
        showCheckboxes: false,
        senderTotal:       0,
        senderCurrent:     0,
        senderVisiblePage: 1,
        receiverTotal:       0,
        receiverCurrent:     0,
        receiverVisiblePage: 1,
        isReceiverTab: true, //send,receive
        senderReport: 'Đang xử lý...',
        receiverReport: 'Đang xử lý...',
        errorTxtVertifyPass: '',
        errorTxtCode: '',
        open:false
      };
  }
  
  componentWillMount(){
    if(this.state.email == "") {
      browserHistory.push('/login');
    }
    else if(this.state.role != "user") {
      browserHistory.push('/*');
    }
  }


  handleSenderPageChanged (newPage) {
    console.log(newPage);
    this.loadSenderData(newPage);
    this.setState({ 
      senderCurrent: newPage
    });
  };

  handleReceiverPageChanged (newPage) {
    console.log(newPage);
    this.loadReceiverData(newPage);
    this.setState({
     receiverCurrent: newPage 
   });
  };

  loadReceiverData(offset) {
    var self = this;
    console.log(offset+"  "+this.state.email);
  
    //send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/transaction-input', {
      email:self.state.email, 
      offset:offset
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        let receiverReport = 'Đang xử lý...';
        if(res.data.receiver_trans.length == 0) {
          receiverReport = 'Không tìm thấy giao dịch nào';
        }
        self.setState({
          receiver_trans: res.data.receiver_trans,
          receiverTotal: Math.ceil(res.data.total_receiver_trans/10),
          receiverReport: receiverReport
        })
      } else  {
        alert('Load users failed:', res.data.error);
      }
      return;
    })
    .catch(function (error) {
      alert('Load users failed');
      return;
    });
  }

  loadSenderData(offset) {
    var self = this;

    console.log(offset+"  "+this.state.email);
    //send request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/transaction-output', {
      email:self.state.email, 
      offset:offset
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        let senderReport = 'Đang xử lý...';
        if(res.data.sender_trans.length == 0) {
          senderReport = 'Không tìm thấy giao dịch nào';
        }
        self.setState({
          sender_trans: res.data.sender_trans,
          senderTotal: Math.ceil(res.data.total_sender_trans/10),
          senderReport: senderReport
        })
      } else  {
        alert('Load users failed:', res.data.error);
      }
      return;
    })
    .catch(function (error) {
      alert('Load users failed');
      return;
    });
  }

  handleTabChange = () => {
    let isReceiverTab = !this.state.isReceiverTab;
    if(isReceiverTab) {
      this.loadReceiverData(0);
    } else {
      this.loadSenderData(0);
    }

    this.setState({
      senderCurrent: 0,
      receiverCurrent: 0,
      isReceiverTab: isReceiverTab
    });
  };

  onDialogChange(event, newValue) {
    if (event.target.value == '') {
      switch(event.target.id) {
        case 'vertify_pass': {
          this.setState({ errorTxtVertifyPass: 'Vertify Password is required' });
          return;
        }
        case 'code': {
          this.setState({ errorTxtCode: 'Code is required' });
          return;
        }
      }
    } else {
      this.setState ({ 
        errorTxtVertifyPass: '', 
        errorTxtCode: ''
      });
    }
  }

  componentWillReceiveProps() {
    if(this.state.isReceiverTab) {
      this.loadReceiverData(this.state.receiverCurrent)
    } else {
      this.loadSenderData(this.state.senderCurrent);
    };
  }
  
  componentDidMount() {
    if(this.state.isReceiverTab) {
      this.loadReceiverData(this.state.receiverCurrent)
    } else {
      this.loadSenderData(this.state.senderCurrent);
    };
  }

  postTransaction = (event) => {
    const txtVertifyPass = document.getElementById('vertify_pass');
    const txtCode = document.getElementById('code');

    if(txtVertifyPass.value == "") {
      this.setState({ errorTxtVertifyPass: 'Vertify Password is required' })
      return;
    }
    if(txtCode.value == "") {
      this.setState({ errorTxtCode: 'Code is required' })
      return;
    }

    var self = this;

    var passwordHash = Utils.hash(txtVertifyPass.value).toString('hex');
    //post transaction
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/send', {
      code: txtCode.value,
      password: passwordHash,
      email: self.state.email,
      receiver_address: self.state.currentItem.receiver_address,
      amount: self.state.currentItem.amount,
      transaction_id: self.state.currentItem.transaction_id
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status == 200){
        alert('Gửi giao dịch thành công!');
        browserHistory.push('/transactions');
      } else if(response.status == 400) {
        alert('Số dư trong tài khoản không đủ để thực hiện giao dịch');
      } else {
        alert('Giao dịch không thành công');
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('Giao dịch thất bại');
    });

    this.hideDialog();
  };

  hideDialog() {
    this.setState({open: false});
    browserHistory.push('/transactions');
  }

  handleActiveClick(event, item) {
    console.log('active');
    var self = this;
    //send vertify request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/send-validate', {
      email: self.state.email
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status == 200){
        alert('Đã gửi xác nhận thành công!');      
        self.setState({
          currentItem: item,
          open: true
        });
      } else {
        alert('Gửi xác nhận thất bại');
        return;
      }

    })
    .catch(function (error) {
      console.log(error);
      alert('Xác nhận thất bại');
    });
  }

  handleCancelClick(event, item) {
    console.log('cancel');
    var self = this;
    //send vertify request
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/cancel-transaction', {
      email: self.state.email,
      transaction_id: item.transaction_id
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status == 200){
        alert('Đã hủy giao dịch thành công!');
      } else {
        alert('Hủy giao dịch thất bại');
      }
      return;

    })
    .catch(function (error) {
      console.log(error);
      alert('Yêu cầu thất bại');
    });
  }

  render() {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      columnsReceiverTable: {
        timestamp: {
          width: '20%'
        },
        address: {
          width: '25%'
        },
        hash: {
          width: '25%'
        },
        index: {
          width: '15%'
        },
        amount: {
          width: '15%'
        }
      },
      columnsSenderTable: {
        timestamp: {
          width: '20%'
        },
        address: {
          width: '35%'
        },
        amount: {
          width: '15%'
        },
        status_creating: {
          color: 'blue',
          fontWeight: 'bold',
          width: '15%'
        },
        status_success: {
          color: 'green',
          fontWeight: 'bold',
          width: '15%'
        },
        status_fail: {
          color: 'red',
          fontWeight: 'bold',
          width: '15%'
        },
        status_waiting: {
          fontWeight: 'bold',
          width: '15%'
        },
        status: {
          width: '15%'
        },
        button: {
          width: '15%'
        }
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    };


    var context =  (
      <form>
        <TextField
          id="vertify_pass"
          hintText="Vertify Password"
          floatingLabelText="Vertify Password"
          fullWidth={true}
          type="password"
          errorText= {this.state.errorTxtVertifyPass}
          onChange={this.onDialogChange.bind(this)}
        />

        <TextField
          id="code"
          hintText="Code"
          floatingLabelText="Code"
          fullWidth={true}
          errorText= {this.state.errorTxtCode}
          onChange={this.onDialogChange.bind(this)}
        />

        <Divider/>

        <div style={styles.buttons}>
          <Link to="/transactions">
            <RaisedButton label="Thoát" 
            onClick={(event) => this.hideDialog()}/>
          </Link>

          <RaisedButton label="Gửi"
            style={styles.saveButton}
            onClick={(event) => this.postTransaction(event)}
            primary={true}/>
        </div>
      </form>
    );


    let showButton = (item) => {
      if(item.status == 'creating') {
        return (
          <div>

            <IconButton onClick={(event) => this.handleActiveClick(event, item)} >
              <ActiveIco />
            </IconButton>

            <IconButton onClick={(event) => this.handleCancelClick(event, item)}>
              <CancelIco />
            </IconButton>
          </div>
        );
      } else {
        return (
          <div>
          </div>
        );
      }
    }

    var transactions = [];
    if(this.state.isReceiverTab) {
      transactions = this.state.receiver_trans; 
    } else {
      transactions = this.state.sender_trans;
    }
    console.log(transactions);
    if(transactions == null || transactions.length == 0) {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Chi tiết giao dịch</h3>
          <Tabs onChange={this.handleTabChange}>
            <Tab label="Nhận tiền" >
              <h3>{this.state.receiverReport}</h3>
              <Link to="/addTransaction" >
                      <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </Link>
            </Tab>
            <Tab label="Gửi tiền" >
              <h3>{this.state.senderReport}</h3>
              <Link to="/addTransaction" >
                      <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </Link>
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Chi tiết giao dịch</h3>
          <Tabs onChange={this.handleTabChange}>
            <Tab label="Nhận tiền" >
              <div>
                <Paper style={globalStyles.paper}>
                  <h3 style={globalStyles.title}>Giao dịch nhận tiền</h3>

                  <div>
                    <Link to="/addTransaction" >
                      <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </Link>

                    <Table>
                      <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                    displaySelectAll={this.state.showCheckboxes}>
                        <TableRow>
                          <TableHeaderColumn style={styles.columnsReceiverTable.timestamp}>Time</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.address}>Sender Address</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.hash}>Referenced Output Hash</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.index}>Referenced Index</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.amount}>Amount</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {transactions.map(item =>
                          <TableRow key={item.transaction_id}>
                          <TableRowColumn style={styles.columnsReceiverTable.timestamp}>{item.timestamp}</TableRowColumn>
                            <TableRowColumn style={styles.columnsReceiverTable.address}>{item.sender_address==-1?'null':item.sender_address}</TableRowColumn>
                            <TableRowColumn style={styles.columnsReceiverTable.hash}>{item.ref_hash==-1?'null':item.ref_hash}</TableRowColumn>
                            <TableRowColumn style={styles.columnsReceiverTable.index}>{item.ref_index==-1?'null':item.ref_index}</TableRowColumn>
                            <TableRowColumn style={styles.columnsReceiverTable.amount}>{item.amount}</TableRowColumn>
                          </TableRow>
                        )}
                      </TableBody>
                      
                    </Table>
                  </div>

                  <div className="row">
                    <Pager
                      total={this.state.receiverTotal}
                      current={this.state.receiverCurrent}
                      visiblePages={this.state.receiverVisiblePage}
                      titles={{ first: '<|', last: '>|' }}
                      className="pagination-sm pull-right"
                      onPageChanged={this.handleReceiverPageChanged}
                    />       
                  </div>
                  <div style={globalStyles.clear}/>
                </Paper>
              </div>
            </Tab>
            <Tab label="Gửi tiền" >
              <div>
                <Paper style={globalStyles.paper}>
                  <h3 style={globalStyles.title}>Giao dịch gửi tiền</h3>

                  <div>
                    <Link to="/addTransaction" >
                      <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </Link>

                    <Table>
                      <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                    displaySelectAll={this.state.showCheckboxes}>
                        <TableRow>
                          <TableHeaderColumn style={styles.columnsSenderTable.timestamp}>Time</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsSenderTable.address}>Receiver Address</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsSenderTable.amount}>Amount</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsSenderTable.status}>status</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsSenderTable.button}></TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {transactions.map(item => {
                          var statusStyle = {};
                          var statusText = '';
                          switch(item.status) {
                            case 'creating': {
                              statusStyle = styles.columnsSenderTable.status_creating;
                              statusText = "Đã khởi tạo";
                              break;
                            }
                            case 'waiting': {
                              statusStyle = styles.columnsSenderTable.status_waiting;
                              statusText = "Đang xử lý";
                              break;
                            }
                            case 'fail': {
                              statusStyle = styles.columnsSenderTable.status_fail;
                              statusText = "Đã hủy";
                              break;
                            }
                            case 'success': {
                              statusStyle = styles.columnsSenderTable.status_success;
                              statusText = "Thành công";
                              break;
                            }
                          }
                          // console.log(status_style);
                          return(
                            <TableRow key={item.transaction_id}>
                              <TableRowColumn style={styles.columnsSenderTable.timestamp}>{item.timestamp}</TableRowColumn>
                              <TableRowColumn style={styles.columnsSenderTable.address}>{item.receiver_address}</TableRowColumn>
                              <TableRowColumn style={styles.columnsSenderTable.amount}>{item.amount}</TableRowColumn>
                              <TableRowColumn style={statusStyle}>{statusText}</TableRowColumn>   
                              <TableRowColumn style={styles.columnsSenderTable.button}>{showButton(item)}</TableRowColumn>          
                            </TableRow>                         
                          )}
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="row">
                    <Pager
                      total={this.state.senderTotal}
                      current={this.state.senderCurrent}
                      visiblePages={this.state.senderVisiblePage}
                      titles={{ first: '<|', last: '>|' }}
                      className="pagination-sm pull-right"
                      onPageChanged={this.handleSenderPageChanged}
                    />       
                  </div>
                  <div style={globalStyles.clear}/>
                </Paper>
              </div>
            </Tab>
          </Tabs>
                  
          <Dialog
            title="Xác nhận giao dịch"
            modal={true}
            open={this.state.open}>
              <div>Vui lòng kiểm tra email để lấy mã xác nhận cho giao dịch</div>
              {context}
          </Dialog>
        </div>
      );
    }
  }
}

export default TransactionDetailPage;
