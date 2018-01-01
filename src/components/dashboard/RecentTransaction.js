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
import SendIco from 'material-ui/svg-icons/navigation/arrow-forward';
import ReceiverIco from 'material-ui/svg-icons/navigation/arrow-back';

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

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    var handleClose = (item) => {
      return (
        <IconMenu iconButtonElement={iconButtonElement} onClick={this.handleOpen}>
          <Dialog
            title="Transaction Detail"
            actions={actions}
            modal={true}
            open={this.state.open}>
            <div>
              Referenced output hash: {item.emailReceiver}
              <br/>
              Referenced output index: {item.emailReceiver}
            </div>
          </Dialog>
        </IconMenu>
      )
    };


    return (
      <Paper>
        <List>
          <Subheader style={styles.subheader}>{this.props.title}</Subheader>
          {this.props.data.map(item => {
              if(item.isReceiver) {
                return(
                  <div key={item._id}>
                    <ListItem
                      leftAvatar={<Avatar icon={<ReceiverIco />} />}
                      primaryText={"Amount:"+ item.amountTransaction}
                      secondaryText={"To:" + item.emailReceiver}
                      rightIconButton={handleClose(item)}
                      hoverColor={orange200}
                    />
                    <Divider inset={true} />
                  </div>
                );
              } else {
                return(
                  <div key={item._id}>
                    <ListItem
                      leftAvatar={<Avatar icon={<SendIco />} />}
                      primaryText={"Amount:"+ item.amountTransaction}
                      secondaryText={"To:" + item.emailReceiver}
                      rightIconButton={handleClose(item)}
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
