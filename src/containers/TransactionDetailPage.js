import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../data';
import {connect} from 'react-redux';
import * as actions from './../actions/index.js';

class TransactionDetailPage extends React.Component {
  loadData() {
    var self = this;
    const apiLink = 'https://nameless-escarpment-79889.herokuapp.com';
    axios.get(apiLink+'/users/'+Data.user.email)
    .then(function (response) {
      console.log(response.data);
      self.props.dispatch(actions.getData(response.data));
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  componentDidMount() {
    this.loadData();    
  }

  componentWillReceiveProps() {
    this.loadData();
  }

  render() {
    const transactions = this.props.user.transactions;
    if(transactions == null) {
      return(<div>The responsive it not here yet!</div>);
    }
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
      columns: {
        id: {
          width: '10%'
        },
        name: {
          width: '40%'
        },
        price: {
          width: '20%'
        },
        category: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    };
    return (
      <PageBase title="Transaction Detail"
                navigation="Application / Transaction Detail">

        <div>
          <Link to="/addTransaction" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.name}>Receiver</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>Amount</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(item =>
                <TableRow key={item._id}>
                  <TableRowColumn style={styles.columns.name}>{item.emailReceiver}</TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{item.amountTransaction}</TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>    
        </div>
      </PageBase>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    user: state.mainReducer.user
  };
}
export default connect (mapStateToProps)(TransactionDetailPage);
