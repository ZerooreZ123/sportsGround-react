import React, { Component } from 'react';

import XHR from '../utils/request';
import API from '../api/index';
import styles from '../styles/UserCenter.css';

class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.state={
      arr:[],
      val:[],
      ids:[],
      input_val:'',
      company_id:'',
      valueName:'',
      valuePhone:'',
      valueCompany:''
    }
  }
  componentDidMount() {
    document.querySelector('title').innerText = '个人信息';
    this.companyList();
    this.getUser();
  }
  editName(ev) {
    this.setState({valueName: ev.target.value});
  }
  editPhone(ev) {
    this.setState({valuePhone: ev.target.value});
  }

  editCompany(ev) {     // 获取公司名字及对应索引
    const data = this.state.arr;
    const value=[],
          ids = [];
    data.forEach(el=>{
      if(ev.target.value && el.name.match(ev.target.value)){
        value.push(el.name)
        ids.push(el.id)
      }
    })
    this.setState({
      val:value,
      ids:ids,
      valueCompany:ev.target.value
    });
  }
  // getCompanyId () {    
  //   const data = this.state.arr;
  //   let index = ''
  //   if(this.state.valueCompany) {
  //     data.forEach((el,i)=>{
  //       if(el.name.match(this.state.valueCompany)){
  //         index = data[i].id;
  //       }
  //     })
  //     this.setState({company_id:index})  
  //   }
  // }
  addCompany(i) {     //填充公司名称及对应ID
    this.setState({
      valueCompany:this.state.val[i],
      company_id:this.state.ids[i]
    });
    this.setState({val:[]});
  }
  async getUser() {    // 用户信息
    const result = await XHR.post(API.getUser,{
      id:this.props.match.params.userid
    })
    this.setState({valueName:JSON.parse(result).data.name});
    this.setState({valuePhone:JSON.parse(result).data.phone});
    this.setState({valueCompany:JSON.parse(result).data.companyName})
  }

  async editUserInfo() {    // 修改用户信息
    
    if(!this.state.valueName || !this.state.valuePhone || !this.state.company_id) {
      alert("请填完整个人信息");
      return false;
    }
    if(!(/^1[34578]\d{9}$/.test(this.state.valuePhone))){
      alert("请填写正确的手机号");
      return false;
    }
    const result=await XHR.post(API.editUserInfo,{
      name:this.state.valueName,
      phone:this.state.valuePhone,
      companyid:this.state.company_id,
      id:this.props.match.params.userid
    })
    if(JSON.parse(result).success === true) {
      alert("修改个人信息成功");
    }
  }
  async companyList() {     // 获取公司列表
    const result=await XHR.post(API.companyList,{
      id:this.props.match.params.userid
    })
    let arr1=[];
    let ret=JSON.parse(result).data;
    ret.forEach(el =>{
      arr1.push({
        name:el.name,
        id:el.id
      })
    })
    this.setState({arr:arr1})
  }
  render() {
    const {val} =this.state;
    return (
      <div className={styles.container}>
        <div className={styles.bgUserCenter}>
          {/* <img src={userImg} className={styles.userImg} alt=""/> */}
        </div>
        <div className={styles.companyManage}  onClick={ev => this.props.history.push('/enterpriseManager/'+this.props.match.params.userid)}>企业管理</div>
        <div className={styles.panel}>
          <div className={styles.pen}><span>姓名：</span><input type="text" placeholder="请输入姓名" className={styles.name} onChange={ev =>this.editName(ev)} value={this.state.valueName}/></div>
          <div className={styles.pen}><span>手机号：</span><input type="text" placeholder="请输入手机号" className={styles.name} onChange={ev =>this.editPhone(ev)} value={this.state.valuePhone}/></div>
          <div className={styles.arrow}><span>公司名称：</span><input type="text" placeholder="请输入公司名称" className={styles.name} onChange={ev =>this.editCompany(ev)} value={this.state.valueCompany}/></div>
          {/* <div className={styles.arrow}><span>公司名称：</span><input type="text" placeholder="请输入公司名称" className={styles.name} onChange={ev =>this.editCompany(ev)} value={this.state.input_val}/></div> */}
          <ul className={styles.list}>
            {
              val.map((item,index) =>
                 <li className={styles.li} key={index} onClick={ev =>this.addCompany(index)}>{item}</li>
              )
            }
          </ul>
        </div>
        <div className={styles.infoPanel}>
          <div className={styles.infoTitle}>
            温馨提示：
          </div>
          <div className={styles.infoText}>
            预约需完成个人信息
          </div>
        </div>
        <div className={styles.editBtn}onClick={ev =>this.editUserInfo(ev)}>确定</div>
      </div>
    );
  }
}

export default UserCenter;
