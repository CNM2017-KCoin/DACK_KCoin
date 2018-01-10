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

class LogTransactionPage extends React.Component {
  constructor(props) {
      super(props);
      const cookies = new Cookies();
      const email = cookies.get('email');
      const password = cookies.get('password');
      this.handlePageChanged = this.handlePageChanged.bind(this);
      this.state = {
        email: email,
        password: password,
        logsList: [],
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
    axios.post(apiLink+'/api/get-transaction-log', {
      email: self.state.email,
      password: self.state.password,
      offset:offset
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status ==  200) {
        var res = response.data;
        let report = 'Đang xử lý...';
        if(res.data.length == 0) {
          report = 'Không tìm thấy báo cáo giao dịch nào';
        }

        self.setState({
          logsList: res.data,
          total: Math.ceil(res.total/10),
          report: report
        })
      } else  {
        alert('Load failed:', res.data.error);
      }
      return;
    })
    .catch(function (error) {
      alert('Load failed');
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
        timestamp: {
          width: '25%',
          fontSize: 11
        },
        transaction_id: {
          width: '15%'
        },
        user_id: {
          width: '15%',
          fontSize: 11
        },
        email: {
          width: '25%'
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
        }
      }
    };

    var logsList = this.state.logsList;
    if(logsList == null || logsList.length == 0) {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Lịch sử giao dịch</h3>
          <h3>{this.state.report}</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3 style={globalStyles.navigation}>Ví KCoin / Lịch sử giao dịch</h3>
          <div>
                <Paper style={globalStyles.paper}>
                  <h3 style={globalStyles.title}>Lịch sử giao dịch</h3>
                  <div>
                    <Table>
                      <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                    displaySelectAll={this.state.showCheckboxes}>
                        <TableRow>
                          <TableHeaderColumn style={styles.columnsTable.timestamp}>Created At</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.user_id}>User Id</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.email}>User Email</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.transaction_id}>Transaction Id</TableHeaderColumn>
                          <TableHeaderColumn style={styles.columnsTable.status}>Action</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {logsList.map(item =>{
                          var statusStyle = {};
                          var statusText = '';
                          switch(item.action) {
                            case 'create': {
                              statusStyle = styles.columnsTable.status_creating;
                              statusText = "Đã khởi tạo";
                              break;
                            }
                            case 'send': {
                              statusStyle = styles.columnsTable.status_waiting;
                              statusText = "Đang xử lý";
                              break;
                            }
                            case 'cancel': {
                              statusStyle = styles.columnsTable.status_fail;
                              statusText = "Đã hủy";
                              break;
                            }
                            case 'send_success': {
                              statusStyle = styles.columnsTable.status_success;
                              statusText = "Thành công";
                              break;
                            }
                          }
                          // console.log(statusStyle);
                          return(
                            <TableRow key={item.id}>
                              <TableRowColumn style={styles.columnsTable.timestamp}>{item.created_at}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.user_id}>{item.user_id}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.email}>{item.email}</TableRowColumn>
                              <TableRowColumn style={styles.columnsTable.transaction_id}>{item.transaction_id}</TableRowColumn>
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

export default LogTransactionPage;
