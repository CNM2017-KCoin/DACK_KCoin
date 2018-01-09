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
import LeftIco from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightIco from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import TextField from 'material-ui/TextField';
import Pager from 'react-pager';
// import * as actions from './../actions/index.js';
import globalStyles from '../styles';

class TransactionDetailPage extends React.Component {
  constructor(props) {
      super(props);
      this.handlePageChanged = this.handlePageChanged.bind(this);
      this.state = {
        transList: [],
        showCheckboxes: false,
        total:       0,
        current:     0,
        visiblePage: 1,
        report: 'Đang xử lý...'
      };

        // this.updateRows = this.updateRows.bind(this);
  }
  loadData(offset) {
    var self = this;
    const apiLink = 'https://api-dack-kcoin-wantien.herokuapp.com';
    axios.post(apiLink+'/api/all-transactions', {
      offset:offset
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        let report = 'Đang xử lý...';
        if(res.data.trans_list.length == 0) {
          report = 'Không tìm thấy giao dịch nào';
        }

        self.setState({
          transList: res.data.trans_list,
          total: Math.ceil(res.data.total_trans/10),
          report: report
        })
      } else  {
        alert('Load failed:', res.data.error);
      }
      return;
    })
    .catch(function (error) {
      console.log(error);
      alert('Load failed', error);
      return;
    });
  }

  componentDidMount() {
    this.loadData(this.state.current);    
  }

  componentWillReceiveProps() {
    this.loadData(this.state.current);
  }

  componentWillMount(){

    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    if(email == "") {
      browserHistory.push('/login');
    }
    else if(role != "admin") {
      browserHistory.push('/*');
    }
  }


  handlePageChanged (newPage) {
    console.log(newPage);
    this.loadData(newPage);
    this.setState({ 
      current: newPage
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
      columnsTable: {
        id: {
          width: '5%',
          fontSize: 11
        },
        timestamp: {
          width: '12%',
          fontSize: 11
        },
        senderAddress: {
          width: '18%',
          fontSize: 11
        },
        receiverAddress: {
          width: '18%',
          fontSize: 11
        },
        amount: {
          width: '10%'
        },
        hash: {
          width: '17%',
          fontSize: 11
        },
        index: {
          width: '10%'
        },
        status_creating: {
          color: 'blue',
          fontWeight: 'bold',
          width: '10%'
        },
        status_success: {
          color: 'green',
          fontWeight: 'bold',
          width: '10%'
        },
        status_fail: {
          color: 'red',
          fontWeight: 'bold',
          width: '10%'
        },
        status_waiting: {
          fontWeight: 'bold',
          width: '10%'
        },
        status: {
          width: '10%'
        }
      }
    };

    var transactions = this.state.transList;
    if(transactions == null || transactions.length == 0) {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Chi tiết giao dịch</h3>
          <h3>{this.state.report}</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Chi tiết giao dịch</h3>
          <div>
                <Paper style={globalStyles.paper}>
                  <h3 style={globalStyles.title}>Chi tiết giao dịch</h3>
                  <div>
                    <Table>
                      <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                    displaySelectAll={this.state.showCheckboxes}>
                        <TableRow>
                          <TableHeaderColumn style={styles.columnsTable.id}>ID</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.timestamp}>Time</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.hash}>Ref Output Hash</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.index}>Ref Index</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.amount}>Amount</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.address}>Sender Address</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.address}>Receiver Address</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.status}>Status</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {transactions.map(item =>{
                          var statusStyle = {};
                          var statusText = '';
                          switch(item.status) {
                            case 'creating': {
                              statusStyle = styles.columnsTable.status_creating;
                              statusText = "Đã khởi tạo";
                              break;
                            }
                            case 'waiting': {
                              statusStyle = styles.columnsTable.status_waiting;
                              statusText = "Đang xử lý";
                              break;
                            }
                            case 'fail': {
                              statusStyle = styles.columnsTable.status_fail;
                              statusText = "Đã hủy";
                              break;
                            }
                            case 'success': {
                              statusStyle = styles.columnsTable.status_success;
                              statusText = "Thành công";
                              break;
                            }
                          }
                          // console.log(statusStyle);
                          return(
                            <TableRow key={item.transaction_id}>
                              <TableRowColumn style={styles.columnsTable.id}>{item.transaction_id}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.timestamp}>{item.timestamp}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.hash}>{item.ref_hash==-1?'null':item.ref_hash}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.index}>{item.ref_index==-1?'null':item.ref_index}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.amount}>{item.amount}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.senderAddress}>{item.sender_address==-1?'null':item.sender_address}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.receiverAddress}>{item.receiver_address}</TableRowColumn>
                              <TableRowColumn style={statusStyle}>{statusText}</TableRowColumn>
                            </TableRow>                       
                          )}
                        )}
                      </TableBody>
                      
                    </Table>
                  </div>

                  <div className="row">
                    <Pager
                      total={this.state.total}
                      current={this.state.current}
                      visiblePages={this.state.visiblePage}
                      titles={{ first: '<|', last: '>|' }}
                      className="pagination-sm pull-right"
                      onPageChanged={this.handlePageChanged}
                    />       
                  </div>
                  <div style={globalStyles.clear}/>
                </Paper>
              </div>
        </div>
      );
    }
  }
}

export default TransactionDetailPage;
