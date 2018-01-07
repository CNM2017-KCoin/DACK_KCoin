import React from 'react';
// import axios from 'axios';
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
import LeftIco from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightIco from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import TextField from 'material-ui/TextField';
import Pager from 'react-pager';
import {connect} from 'react-redux';
// import * as actions from './../actions/index.js';
import globalStyles from '../styles';

class TransactionDetailPage extends React.Component {
  constructor(props) {
      super(props);
      this.handleSenderPageChanged = this.handleSenderPageChanged.bind(this);
      this.handleReceiverPageChanged = this.handleReceiverPageChanged.bind(this);
      this.state = {
        showCheckboxes: false,
        senderTotal:       5,
        senderCurrent:     1,
        senderVisiblePage: 1,
        receiverTotal:       5,
        receiverCurrent:     1,
        receiverVisiblePage: 1,
        isReceiverTab: true //send,receive
      };

        // this.updateRows = this.updateRows.bind(this);
  }
  // loadData() {
  //   var self = this;
  //   const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
  //   axios.get(apiLink+'/users/'+Data.user.email)
  //   .then(function (response) {
  //     console.log(response.data);
  //     self.props.dispatch(actions.getData(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log('Request failed', error);
  //   });
  // }

  // componentDidMount() {
  //   this.loadData();    
  // }

  // componentWillReceiveProps() {
  //   this.loadData();
  // }
  componentWillMount(){

    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    if(email == "") {
      browserHistory.push('/login');
    }
    else if(role != "Admin") {
      browserHistory.push('/*');
    }
  }


  handleSenderPageChanged (newPage) {
    console.log(newPage);
    this.setState({ 
      senderCurrent: newPage
    });
  };

  handleReceiverPageChanged (newPage) {
    console.log(newPage);
    this.setState({
     receiverCurrent: newPage 
   });
  };

  handleTabChange = () => {
    // console.log(this);
    this.setState({
      isReceiverTab: !this.state.isReceiverTab
    });
  };


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
          width: '30%'
        },
        amount: {
          width: '25%'
        },
        status_success: {
          color: 'green',
          fontWeight: 'bold',
          width: '25%'
        },
        status_fail: {
          color: 'red',
          fontWeight: 'bold',
          width: '25%'
        },
        status_waiting: {
          fontWeight: 'bold',
          width: '25%'
        },
        status: {
          width: '25%'
        }
      }
    };

    var transactions = [];
    if(this.state.isReceiverTab) {
      transactions = Data.admin.receiverTrans; 
    } else {
      transactions = Data.admin.senderTrans;
    }
    if(transactions == null) {
      return(<div>The responsive it not here yet!</div>);
    }
    return (
      <div>
        <h3 style={globalStyles.navigation}>Ví KCoin / Chi tiết giao dịch</h3>
        <Tabs onChange={this.handleTabChange}>
          <Tab label="Nhận tiền" >
            <div>
              <Paper style={globalStyles.paper}>
                <h3 style={globalStyles.title}>Giao dịch nhận tiền</h3>
                <div>
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
                        <TableRow key={item._id}>
                        <TableHeaderColumn style={styles.columnsReceiverTable.timestamp}>12/12/2017 12:12:12</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.address}>{item.sender_address}</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.hash}>{item.referencedOutputHash}</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.index}>{item.referencedOutputIndex}</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsReceiverTable.amount}>{item.amount}</TableHeaderColumn>
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
                  <Table fixedFooter={this.state.fixedFooter}>
                    <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                  displaySelectAll={this.state.showCheckboxes}>
                      <TableRow>
                        <TableHeaderColumn style={styles.columnsSenderTable.timestamp}>Time</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsSenderTable.address}>Receiver Address</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsSenderTable.amount}>Amount</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsSenderTable.status}>status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                      {transactions.map(item => {
                        var status_style = {};
                        switch(item.status) {
                          case 'waiting': {
                            status_style = styles.columnsSenderTable.status_waiting;
                            break;
                          }
                          case 'fail': {
                            status_style = styles.columnsSenderTable.status_fail;
                            break;
                          }
                          case 'sucess': {
                            status_style = styles.columnsSenderTable.status_success;
                            break;
                          }
                        }
                        // console.log(status_style);
                        return(
                          <TableRow key={item._id}>
                          <TableHeaderColumn style={styles.columnsSenderTable.timestamp}>12/12/2017 12:12:12</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsSenderTable.address}>{item.receiver_address}</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsSenderTable.amount}>{item.amount}</TableHeaderColumn>
                          <TableHeaderColumn style={status_style}>{item.status}</TableHeaderColumn>                
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
        
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    user: state.mainReducer.user
  };
}
// export default connect (mapStateToProps)(TransactionDetailPage);

export default TransactionDetailPage;
