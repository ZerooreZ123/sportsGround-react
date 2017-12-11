import React, { Component } from 'react';
import XHR from '../utils/request';
import API from '../api/index';

import styles from '../styles/MyWallet.css';

class MyWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:{}
    }
  }
  componentDidMount(){
    document.querySelector('title').innerText = '我的钱包';
    this.Balance();
  }
  async Balance() {
    const result = await XHR.post(API.Balance,{
      id:this.props.match.params.userid
    })
    this.setState({dataSource: JSON.parse(result).data});
    console.log(this.state.dataSource);
  }
  async deposit() {
    const result = await XHR.post(API.orderRefund,{
      userid:this.props.match.params.userid
    })
    if(JSON.parse(result).success === true) {
      alert('退款成功');
    }
  }
  render() {
    const {dataSource} = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardTitle1}>
            <span className={styles.cardTitle1big}>押金</span>
            <span className={styles.cardTitle1small}>(￥300)</span>
          </div>
          <div className={styles.hasPay}>{dataSource.deposit === 'Y' ?'已支付':'未缴纳'}</div>
          <div className={styles.refund} onClick={ev =>this.deposit(ev)}>退款</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle1}>
            <span className={styles.cardTitle1big}>余额</span>
          </div>
          <span className={styles.money}>￥{dataSource.balance}</span>
          <div className={styles.give}>赠送金额</div>
          <div className={styles.amount}>￥{dataSource.giftbalance}</div>
          <div className={styles.recharge} onClick={ev => this.props.history.push('/recharge/'+this.props.match.params.userid)}>充值</div>
        </div>
      </div>
    );
  }
}

export default MyWallet;
