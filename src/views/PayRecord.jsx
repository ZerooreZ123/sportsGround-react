import React, { Component } from 'react';
import XHR from '../utils/request';
import API from '../api/index';

import styles from '../styles/PayRecord.css';
import listIcon from '../asset/icon-01.png';

class PayRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: []
    };
  }
  componentDidMount(){
    document.querySelector('title').innerText = '充值记录';
    this.orderRechareRecords();
  }
  async orderRechareRecords() {
    const result = await XHR.post(API.orderRechareRecords,{
      userid:this.props.match.params.userid
    })
    console.log(result);
    this.setState({List: JSON.parse(result).data});
    console.log(this.state.List);
  }
  render() {
    return (
      <div className={styles.wrap}>
        {
          this.state.List.map((item,index) => 
            <div className={styles.listItem} key={index}>
              <img src={listIcon} className={styles.listImg} alt="" />
              <div className={styles.rightDiv}>
                <div className={styles.listTitle}>充{item.price}送{item.giftBalance}元</div>
                <div className={styles.listTime}>{item.createDate}</div>
              </div>
              <div className={styles.listMoney}>￥{item.price}</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default PayRecord;
