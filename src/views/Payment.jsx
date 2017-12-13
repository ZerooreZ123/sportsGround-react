import React, { Component } from 'react';
import styles from '../styles/Payment.css';

class Payment extends Component {
    componentDidMount() {
        document.querySelector('title').innerText = '支付';
    }
    componentWillUnmount() {
        delete window.wxPay;
    }
    payMoney() {
        window.WeixinJSBridge.invoke(     // 调用微信支付接口
            'getBrandWCPayRequest', window.wxPay,
            (res) => {
              if (res.err_msg === "get_brand_wcpay_request:ok") {
                  if(window.history.length <=1){
                    window.history.go(-1)
                  }else{
                    window.history.go(-2)
                  }
              }
            }
        );
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.textBox}>
                    <div className={styles.text}>即将进行微信支付</div>
                    <div>请确认是否本人操作</div>
                </div>
                <div className={styles.btn} onClick={ev =>this.payMoney(ev)}>支付</div>
            </div>
        )
    }  
}

export default Payment;