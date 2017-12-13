import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import CSSTransitionGroup from 'react-addons-css-transition-group'

import MainPage from './views/MainPage';
import PayRecord from './views/PayRecord';
import UserCenter from './views/UserCenter';
import CouponList from './views/CouponList';
import Order from './views/Order';
import MyWallet from './views/MyWallet';
import About from './views/About';
import BookingRecord from './views/BookingRecord';
import EnterpriseManager from './views/EnterpriseManager';
import Recharge from './views/Recharge';
import QrCode from './views/QrCode';
import Payment from './views/Payment';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route render={props => {
            let animateCls = '';
            let leaveTime = 0.1;
            if(props.history.action === 'PUSH'){
              animateCls = 'left';
              leaveTime = 250;
            }
            return (
              <CSSTransitionGroup
                transitionName={animateCls}
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={leaveTime}
              >
                <div key={props.location.pathname}>
                  <Route location={props.location} exact path="/home/:id/:userid" component={MainPage} />
                  <Route location={props.location} exact path="/payRecord/:userid" component={PayRecord} />
                  <Route location={props.location} exact path="/userCenter/:userid" component={UserCenter} />
                  <Route location={props.location} exact path="/couponList/:userid" component={CouponList} />
                  <Route location={props.location} exact path="/order" component={Order} />
                  <Route location={props.location} exact path="/myWallet/:userid" component={MyWallet} />
                  <Route location={props.location} exact path="/about" component={About} />
                  <Route location={props.location} exact path="/bookingRecord/:userid" component={BookingRecord} />
                  <Route location={props.location} exact path="/enterpriseManager/:userid" component={EnterpriseManager} />
                  <Route location={props.location} exact path="/recharge/:userid" component={Recharge} />
                  <Route location={props.location} exact path="/qrCode/:userid" component={QrCode} />
                  <Route location={props.location} exact path="/payment/:userid" component={Payment} />
                </div>
              </CSSTransitionGroup>
            )
          }} />
        </Router>
      </div>
    );
  }
}

export default App;
