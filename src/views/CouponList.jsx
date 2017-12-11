import React, { Component } from 'react';
import XHR from '../utils/request';
import API from '../api/index';
import styles from '../styles/CouponList.css';

const CouponListItem = ({couponNumber, couponUseInfo,startdate,enddate }) => {

  return (
    <div className={styles.couponListItem}>
      <div className={styles.couponImg}>
        <span className={styles.couponNumber}>{couponNumber}</span>
        <span className={styles.couponText}>折优惠券</span>
        <div className={styles.deadline}><span>使用期限:</span>{startdate}-{enddate}</div>
      </div>
      <div className={styles.couponUseInfo}>{couponUseInfo}</div>
    </div>
  );
}

class CouponList extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      dataSource:[]
    };
  }
  componentDidMount() {
    document.querySelector('title').innerText = '优惠券';
    this.conpon();
  }
  onNavClick(index) {
    this.setState({ activeIndex: index });
  }
  async conpon() {
    const result = await XHR.post(API.conpon,{
      userid:this.props.match.params.userid
    })
    const data = JSON.parse(result).data,
          dataResult = []
    data.forEach((el,i) => {
      dataResult.push({
        discount:el.discount,
        startdate:el.startdate.slice(0,10).replace(/-/g,'/'),
        enddate:el.enddate.slice(0,10).replace(/-/g,'/')
      })
    })
    


    this.setState({dataSource: dataResult});
  }
  render() {
    const {dataSource} = this.state;
    return (
      <div className={styles.wrap}>
        <div className={styles.listContainer}>
          {
            dataSource.map((item,index) =>
              <CouponListItem couponNumber={item.discount} couponUseInfo="未使用" startdate={item.startdate} enddate={item.enddate} key={index}></CouponListItem>
            )
          }
          
        </div>
      </div>
    );
  }
}

export default CouponList;
