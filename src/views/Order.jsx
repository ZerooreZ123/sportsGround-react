import React, { Component } from 'react';
import XHR from '../utils/request';
import API, { admin } from '../api/index';

import styles from '../styles/Order.css';

class Order extends Component {
  constructor() {
    super();
    this.state = {
      discount: 0,
      mask: false,
      Coupon: '请选择优惠券',
      dataSource: []
    };
  }
  componentDidMount() {
    document.querySelector('title').innerText = '订单确认';
    this.conpon();
  }
  hideMask() {
    this.setState({ mask: false });
  }
  showMask() {
    this.setState({ mask: true });
  }
  
  selectCoupon(i) {     //选择优惠券计算折扣
    const tempDeposit = JSON.parse(window.sessionStorage.getItem('tempData'))
    this.setState({ Coupon: this.state.dataSource[i].discount + '折优惠券' })
    this.setState({ mask: false });
    const tempDetails = tempDeposit.siteDetails || [];
    let tempPrice = tempDeposit.totalPrice/100;
    const arrPrice = [];
    tempDetails.forEach(el => {
      arrPrice.push(el.price-0);
    });
    let max = Math.max(...arrPrice)/100;

    window.indexMax = arrPrice.indexOf(max*100);      //选中优惠券索引
    window.couponId = this.state.dataSource[i].id;    //选中优惠券ID
    
    let maxDiscount = max * (1 - this.state.dataSource[i].discount * 0.1);      //折扣价(该减去的价格)
    window.discountPrice = Math.floor((Math.max(...arrPrice) *(this.state.dataSource[i].discount*0.1)));   //折扣的价格（传参以分计）
    if (parseInt(tempPrice) === 0) {
      this.setState({ discountPrice: tempPrice })
    } else {
      let zhekouPrice = (tempPrice - maxDiscount).toFixed(2);       //折扣总价
      this.setState({ discountPrice: zhekouPrice });
    }
  }
  async conpon() {    //优惠券列表
    const tempDeposit = JSON.parse(window.sessionStorage.getItem('tempData'))   // sessionStorage储存的数据
    const result = await XHR.post(API.conpon, {
      userid: tempDeposit.userSiteId.userid
    })
    if(JSON.parse(result).data.length === 0) {
      this.setState({Coupon:'无优惠券'})
      this.setState({discountPrice:tempDeposit.totalPrice/100}) 
    }else {
      this.setState({ dataSource: JSON.parse(result).data });
      this.setState({discountPrice:tempDeposit.totalPrice/100}) 
    }
  }
  async orderPay() {     //支付
    const tempDeposit = JSON.parse(window.sessionStorage.getItem('tempData'))
    let ordersArray = tempDeposit.sendDate.orders;
    let data = {
      userid: tempDeposit.userSiteId.userid,
      orders: []
    };    
    
    ordersArray.forEach((el, i) => {
      data.orders.push({
        siteId: ordersArray[i].siteId,
        sitePriceId: ordersArray[i].sitePriceId,
        price: ordersArray[i].price,
        useDate: ordersArray[i].useDate
      })
    })
    if(this.state.dataSource.length && window.discountPrice) {
      data.orders[window.indexMax].price = window.discountPrice;
      data.orders[window.indexMax].userCouponId = window.couponId;
    }
    const result = await XHR.post(API.orderPay, data);
    if(JSON.parse(result).data !== ''){
      window.sessionStorage.setItem('wxPay',result);
      window.location.href = './payment.html';
    }else{
      alert('支付完成')
      window.history.go(-1);
    }
  }

  render() {
    const tempDeposit = JSON.parse(window.sessionStorage.getItem('tempData'))
    const tempDetails = tempDeposit.siteDetails || [];
    const { dataSource } = this.state;

    const Mask = props => {
      if (this.state.mask) {
        return (
          <div className={styles.mask} onClick={ev => this.hideMask()}>
            <div className={styles.maskList}>
              {
                dataSource.map((item, index) =>
                  <div className={styles.maskListItem} key={index} onClick={ev => this.selectCoupon(index)}>{item.discount}折优惠券</div>
                )
              }
            </div>
          </div>
        );
      } else {
        return null;
      }
    }
    return (
      <div>
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.title}>订单信息</div>
            {
              tempDetails.map((item, index) =>
                <div className={styles.infoDetailContainer} key={index}>
                  <img src={admin + item.pic} alt="" />
                  <div className={styles.rightDiv}>
                    <div className={styles.infoTitle}>{item.siteName}</div>
                    <div className={styles.infoPrice}>价格：￥{item.price/100}</div>
                    <div className={styles.infoTime}>预约时间：{item.sitetime} {item.startTime}~{item.endTime}</div>
                  </div>
                </div>

              )
            }
          </div>
          <div className={styles.priceContainer}>
            <div className={[styles.priceItem, styles.priceItemTitle].join(' ')}>
              订单金额
            </div>
            <div className={styles.priceItem}>
              总金额：
              <span className={styles.price}>￥{tempDeposit.totalPrice/100}</span>
            </div>
            <div className={styles.priceItem} onClick={ev => this.showMask()}>
              优惠券：
              <span className={styles.coupon}>{this.state.Coupon}</span>
            </div>
            <div className={styles.priceItem}>
              应付金额：
              <span className={styles.price}>￥{this.state.discountPrice}</span>
            </div>
          </div>
          <div className={styles.payBtn} onClick={ev => this.orderPay(ev)}>支付</div>
        </div>
        <Mask></Mask>
      </div>
    );
  }
}

export default Order;
