import React, { Component } from 'react';
import Picker from 'react-mobile-picker';
import XHR from '../utils/request';
import API, { admin } from '../api/index';

import styles from '../styles/MainPage.css';

import select0 from '../asset/icon/select-0.png';
import select1 from '../asset/icon/select-1.png';
import loading from '../asset/icon/loading.gif';

const SelectBtn = (props) => {
  if (props.checked === true) {
    return <img className={styles.listItemImg} src={select1} alt="" />;
  } else {
    return <img className={styles.listItemImg} src={select0} alt="" />;
  }
}

const Mask = ({ optionGroups, valueGroups, visible, parent }) => {
  if (visible) {
    return (
      <div className={styles.mask} onClick={ev => parent.hideMask(ev)}>
        <div className={styles.maskList} onClick={ev => parent.selectCoupon(ev)}>
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={parent.handleChange} />
          <div className={styles.confirm} onClick={ev => parent.sitePrice(ev)}>OK</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

class MainPage extends Component {
  constructor() {
    super();
    window.temp = {};
    this.state = {
      dataSource: {},
      mask: false,
      record: [],
      total: 0,
      picSrc:'',
      valueGroups: {
        data: '请选择预定日期'
      },
      optionGroups: {
        data: []
      }
    };
  }
  componentDidMount() {
    document.querySelector('title').innerText = '主页';
    this.siteDate();
    this.siteInfo();
    window.temp.userSiteId = this.props.match.params;  //userSiteId 路由传参
  }
  handleChange = (name, value) => {
    this.setState({ valueGroups: { data: value } });
  }
  hideMask() {
    this.setState({ mask: false });
  }
  showMask() {
    this.setState({ mask: true });
  }
  selectCoupon(ev) {
    ev.stopPropagation();
  }
  load() {
    this.setState({picSrc:loading})
  }
  selectTime(i) {     //预订场次状态切换
    this.state.record[i].selected = !this.state.record[i].selected;
    let total = 0;
    this.state.record.forEach(el => {
      if (el.selected) {
        total += (+el.userPrice);
      }
    })
    this.setState({ total, record: this.state.record })

  }
  async siteDate() {    //场地日期
    const result = await XHR.post(API.siteDate, {
      id:this.props.match.params.id
    })
    this.setState({ optionGroups: { data: JSON.parse(result).data } });
  }
  async siteInfo() {    //场地信息
    const result = await XHR.post(API.siteInfo, {
      id:this.props.match.params.id
    })
    this.setState({ dataSource: JSON.parse(result).data });
    this.setState({picSrc:admin+JSON.parse(result).data.pic})
  }
  async sitePrice() {   //场地时间段价格表
    this.setState({ mask: false });
    const result = await XHR.post(API.sitePrice, {
      userid:this.props.match.params.userid,
      siteid:this.props.match.params.id,
      date: this.state.valueGroups.data
    })
    this.setState({ record: JSON.parse(result).data ||[] })
    this.setState({ total: 0 })
  }

  async orderPredetermine() {    //立即支付
    const { dataSource,valueGroups } = this.state;
    const ret = [];

    this.state.record.forEach(el => {
      if (el.selected) {
        ret.push({
          pic: dataSource.pic,
          id: el.id,
          siteName: dataSource.name,
          sitetime: valueGroups.data,
          sizeName: el.sizeName,
          startTime: el.starttime,
          endTime: el.endtime,
          price: el.userPrice
        })
      }
    });
    
    window.temp.siteDetails= ret;    //siteDetails 勾选的场地详情信息
    let send_data = {
      userid:this.props.match.params.userid,
      orders: []
    };

    ret.forEach((el,i)=>{
      send_data.orders.push({
        siteId:this.props.match.params.id,
        sitePriceId: ret[i].id,
        price: ret[i].price,
        useDate: valueGroups.data
      })
    })    

    window.temp.sendDate = send_data;    // sendDate 立即支付传参
    const result = await XHR.post(API.orderPredetermine,send_data);
    window.temp.totalPrice= this.state.total;  //totalPrice 总价
    if(JSON.parse(result).success === true && this.state.total) {
      this.props.history.push('/order');
    }else{
      alert(JSON.parse(result).msg)
    }
  }

  render() {
    const { optionGroups, valueGroups,record } = this.state;
    return (
      <div className={styles.wrap}>
        <div>
          <img className={styles.topBg}  onError={ev =>this.load(ev)} src={this.state.picSrc} alt="" />
        </div>
        <div className={styles.infoBar} onClick={ev => this.showMask()}>{this.state.valueGroups.data === '' ? '请选择日期' : this.state.valueGroups.data}</div>
        <div className={styles.container}>
          {
            record.map((item, index) =>
              <div className={styles.listItem} key={index} onClick={ev => this.selectTime(index)}>
                <div className={styles.listItemTime}>{item.starttime}-{item.endtime}</div>
                <span className={styles.listItemMoney}>￥{item.userPrice}</span>
                <SelectBtn checked={item.selected}></SelectBtn>
              </div>
            )
          }
        </div>
        <div className={styles.bot}>
          <span className={styles.botText}>总计：￥{this.state.total}</span>
          <div onClick={ev => this.orderPredetermine(ev)} className={styles.botBtn2}>立即付款</div>
        </div>
        <Mask visible={this.state.mask} optionGroups={optionGroups} valueGroups={valueGroups} parent={this}></Mask>
      </div>
    );
  }
}

export default MainPage;
