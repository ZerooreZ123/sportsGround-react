import React, { Component } from 'react';

import XHR from '../utils/request';
import API from '../api/index';
import styles from '../styles/Recharge.css';

import select0 from '../asset/icon/select-0.png';
import select1 from '../asset/icon/select-1.png';
import thumb from '../asset/icon/thumb.png';

const SelectToggle = (props) => {
  if (props.checked === true) {
    return <img className={styles.listItemImg} src={select1} alt="" />;
  } else {
    return <img className={styles.listItemImg} src={select0} alt="" />;
  }
}

class Recharge extends Component {
    constructor() {
      super();
      this.state={
        dataSource:[]
      }
    }
    componentDidMount() {
      document.querySelector('title').innerText = '充值';
      this.payList();
    }
    selectMoney(i) {
      this.state.dataSource.forEach(el => {
         el.selected = false;
      })
      this.state.dataSource[i].selected = !this.state.dataSource[i].selected;
      this.setState({dataSource:this.state.dataSource});
    }
    async payList() {    // 充值金额列表
      const result = await XHR.post(API.payList);
      this.setState({dataSource:JSON.parse(result).data });
    }
    async orderRechare() {    //  充值
      const {dataSource} = this.state;
      let priceId ='';
      dataSource.forEach((el,i) =>{
        if(el.selected){
          priceId = el.id
        }
      })
      const result = await XHR.post(API.orderRechare,{
        payid:priceId,
        userid:this.props.match.params.userid,
        orderType:1
      })
      if(JSON.parse(result).data !== '') {
        window.sessionStorage.setItem('wxPay',result);
        window.location.href = './payment.html';
      }else{
        alert('请选择充值金额');
      }
    }
    render() {
      const {dataSource} = this.state;
      return (
        <div className={styles.container}>
           <div className={styles.bgUserCenter}></div>
           <div className={styles.rechargeList}>
              {
                dataSource.map((item,index) =>
                  <div className={styles.listItem} onClick={ev =>this.selectMoney(index)} key={index}>
                    <img className={styles.listItemThumb} src={thumb} alt="" />
                    <span className={styles.listItemMoney}>充{item.pay/100}送{item.presented/100}元</span>
                    <SelectToggle checked={item.selected}></SelectToggle>
                  </div>
                ) 
              }
            </div>
            <div className={styles.btnBox}>
              <div className={styles.rechargeBtn} onClick={ev => this.orderRechare(ev)}>确定</div>
            </div> 
        </div>
      );
    }
  }
  
export default Recharge;
  