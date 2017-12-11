import React, { Component } from 'react';
import XHR from '../utils/request';
import API, { admin } from '../api/index';

import styles from '../styles/BookingRecord.css';

class BookingRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
    }
  }
  componentDidMount() {
    document.querySelector('title').innerText = '预约记录';
    this.siteRecords();
  }
  async siteRecords() {
    const result = await XHR.post(API.siteRecords,{
      userid:this.props.match.params.userid
    })
    this.setState({dataSource: JSON.parse(result).data});
    console.log(this.state.dataSource);
  }
  render() {
    return (
      <div className={styles.listContainer}>
        {
          this.state.dataSource.map((item,index )=>
            <div className={styles.listItem} key={index}>
              <img className={styles.demoImg} src={admin + item.pic} alt="" />
              <div className={styles.rightDiv}>
                <div className={styles.title}>{item.siteName}</div>
                <div className={styles.date}>{item.usedate}&emsp;{item.week}</div>
                <div className={styles.time}>{item.starttime}~{item.endtime}</div>
                {/* <img className={styles.stateImg} src={hasBookingImg} alt="" /> */}
                <span className={styles.money}>￥{item.price}</span>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default BookingRecord;
