import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import Cookies from 'universal-cookie';
import Data from '../data';

class Header extends React.Component {


  handleClick(event){
    const cookies = new Cookies();
    cookies.set('email', "", { path: '/' });
    cookies.set('password', "", { path: '/' });
    cookies.set('role', "", { path: '/' });
  }
  
  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };
    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={
                <div>KCoin Wallet</div>
              }
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
    
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Sign out" 
                        onClick={(event) => this.handleClick(event)}
                        containerElement={<Link to="/login"/>}
                        />
                  </IconMenu>
                </div>
              }
            />
          </div>
      );
  }
}

export default Header;
