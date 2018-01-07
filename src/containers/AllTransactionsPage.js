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
      this.handlePageChanged = this.handlePageChanged.bind(this);
      this.state = {
        showCheckboxes: false,
        total:       5,
        current:     1,
        visiblePage: 1
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


  handlePageChanged (newPage) {
    console.log(newPage);
    this.setState({ 
      current: newPage
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
      columnsTable: {
        timestamp: {
          width: '10%'
        },
        senderAddress: {
          width: '20%'
        },
        receiverAddress: {
          width: '20%'
        },
        amount: {
          width: '10%'
        },
        hash: {
          width: '20%'
        },
        index: {
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

    var transactions = Data.admin.transactions;
    if(transactions == null) {
      return(<div>The responsive it not here yet!</div>);
    }
    return (
      <div>
        <h3 style={globalStyles.navigation}>Ví KCoin / Chi tiết giao dịch</h3>
        <div>
              <Paper style={globalStyles.paper}>
                <h3 style={globalStyles.title}>Giao dịch nhận tiền</h3>
                <div>
                  <Table>
                    <TableHeader adjustForCheckbox={this.state.showCheckboxes}
                                  displaySelectAll={this.state.showCheckboxes}>
                      <TableRow>
                        <TableHeaderColumn style={styles.columnsTable.timestamp}>Time</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsTable.hash}>Referenced Output Hash</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsTable.index}>Referenced Index</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsTable.amount}>Amount</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsTable.address}>Sender Address</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsTable.address}>Receiver Address</TableHeaderColumn>
                        <TableHeaderColumn style={styles.columnsTable.status}>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                      {transactions.map(item =>{
                        var status_style = {};
                        switch(item.status) {
                          case 'waiting': {
                            status_style = styles.columnsTable.status_waiting;
                            break;
                          }
                          case 'fail': {
                            status_style = styles.columnsTable.status_fail;
                            break;
                          }
                          case 'success': {
                            status_style = styles.columnsTable.status_success;
                            break;
                          }
                        }
                        // console.log(status_style);
                        return(
                          <TableRow key={item._id}>
                            <TableHeaderColumn style={styles.columnsTable.timestamp}>{item.timestamp}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnsTable.hash}>{item.referencedOutputHash}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnsTable.index}>{item.referencedOutputIndex}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnsTable.amount}>{item.amount}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnsTable.senderAddress}>{item.sender_address}</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columnsTable.receiverAddress}>{item.receiver_address}</TableHeaderColumn>
                            <TableHeaderColumn style={status_style}>{item.status}</TableHeaderColumn>
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

const mapStateToProps = (state) =>{
  return {
    user: state.mainReducer.user
  };
}
// export default connect (mapStateToProps)(TransactionDetailPage);

export default TransactionDetailPage;
