import React from 'react';
import { render } from 'react-dom';
import {browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import HomeIco from 'material-ui/svg-icons/action/home';
import DetailIco from 'material-ui/svg-icons/action/assessment';
import Cookies from 'universal-cookie';
import Data from '../data';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    this.state = {
      navDrawerOpen: false,
      email:email,
      role:role
    };

    if(role == "user") {
      this.menus = [
          { text: 'Trang chủ', icon: <HomeIco/>, link: '/dashboard' },
          { text: 'Chi tiết giao dịch', icon: <DetailIco/>, link: '/transactions' }
        ];
    } else if(role == "admin"){
      this.menus = [
          { text: 'Danh sách người dùng', icon: <HomeIco/>, link: '/all_users' },
          { text: 'Danh sách giao dịch', icon: <DetailIco/>, link: '/all_transactions' },
          { text: 'Lịch sử giao dịch', icon: <DetailIco/>, link: '/logs' }
        ];
    } else {
      this.menus = [];
    }
  }

  componentWillMount(){
    const cookies = new Cookies();
    const email = cookies.get('email');
    const role = cookies.get('role');
    console.log(this.state.email+"  "+this.state.role);
    if(this.state.email == null || this.state.role == null) {
      browserHistory.push('/login');
      return;
    }
    if(this.state.role == "admin") {
      browserHistory.push('/all_users');
    } else if(this.state.role == "user"){
      browserHistory.push('/dashboard');
    } else {
      browserHistory.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={this.menus}
                        username={this.state.email}
                        role={this.state.role}/>

            <div style={styles.container}>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withWidth()(HomePage);
