import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import {grey400, cyan600, white, orange200} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import ReceiverIco from 'material-ui/svg-icons/navigation/arrow-forward';
import SendIco from 'material-ui/svg-icons/navigation/arrow-back';

class RecentTransaction extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const styles = {
      subheader: {
        fontSize: 24,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan600,
        color: white
      }
    };

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    var viewDetail = (item) => {
      var context = '';
      if(item.sender_address != null) {
        context = (<div>
          Sender Address: {item.sender_address}
          <br/>
          Amount: {item.amount}
          <br/>
          Referenced output hash: {item.referencedOutputHash}
          <br/>
          Referenced output index: {item.referencedOutputIndex}
        </div>);
      } 

      return (
        <IconButton
          touch={true}
          tooltipPosition="bottom-left" 
          onClick={this.handleOpen}>
          <MoreVertIcon color={grey400} />
          <Dialog
            title="Transaction Detail"
            actions={actions}
            modal={true}
            open={this.state.open}>
            {context}
          </Dialog>
        </IconButton>
      )
    };


    return (
      <Paper>
        <List>
          <Subheader style={styles.subheader}>{this.props.title}</Subheader>
          {this.props.data.map(item => {
              if(item.sender_address == null) {
                return(
                  <div key={item._id}>
                    <ListItem
                      leftAvatar={<Avatar icon={<SendIco />} />}
                      primaryText={"Amount:"+ item.amount}
                      secondaryText={"To:" + item.receiver_address}
                      rightIconButton={viewDetail(item)}
                      hoverColor={orange200}
                    />
                    <Divider inset={true} />
                  </div>
                );
              } else {
                return(
                  <div key={item._id}>
                    <ListItem
                      leftAvatar={<Avatar icon={<ReceiverIco />} />}
                      primaryText={"Amount:"+ item.amount}
                      secondaryText={"From:" + item.sender_address}
                      rightIconButton={viewDetail(item)}
                    />
                    <Divider inset={true} />
                  </div>
                );
              }
              
            }
          )}
        </List>
      </Paper>
    );
  };
}

RecentTransaction.propTypes = {
  data: PropTypes.array
};

export default RecentTransaction;
