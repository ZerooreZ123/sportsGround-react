import React, { Component } from 'react';
import Switch from 'react-ios-switch';
import XHR from '../utils/request';
import API from '../api/index';

import styles from '../styles/EnterpriseManager.css';
import deleteBtn from '../asset/icon/delete.png';

class EnterpriseManager extends Component {
  constructor(){
    super();
    this.state = {
      dataSource:[]
    };
  }
  componentDidMount() {
    document.querySelector('title').innerText = '企业管理';
    this.usreList();
  }
  deleteConfirm(i) {
    let mes = "确定要删除吗？";
    if(window.confirm(mes) === true) {
      this.deleteItem(i);
      const list = this.state.dataSource;
      list.splice(i,1);
      this.setState({dataSource:this.state.dataSource});
    }else{
      return false
    }
  }
  async deleteItem(i) {
    const result = await XHR.post(API.userAudit,{
      userId:this.props.match.params.userid,
      passed:this.state.dataSource[i].passed,
      del_flag:1
    })
  }
  async usreList() {
    const result = await XHR.post(API.usreList,{
      id:this.props.match.params.userid
    });
    this.setState({dataSource: JSON.parse(result).data});
    console.log(this.state.dataSource);
  }
  async userAudit(i){
    if(this.state.dataSource[i].passed ==='Y') {
      this.state.dataSource[i].passed ='N'
    }else{
      this.state.dataSource[i].passed ='Y';
    }
    const result = await XHR.post(API.userAudit,{
      userId:this.props.match.params.userid,
      id:this.state.dataSource[i].id,
      passed:this.state.dataSource[i].passed
    })
    this.setState({dataSource:this.state.dataSource})
  }
  render() {
    const {dataSource} = this.state;
    return (
      <div className={styles.container}>
        {
          dataSource.map((item,index) =>
            <div className={styles.listItem} key={index}>
              <div className={styles.listItemName}>{item.name}</div>
              <div className={styles.listItemPhone}>{item.phone}</div>
              <Switch checked={item.passed === 'Y' ? true : false}
                onChange={ev =>this.userAudit(index)} />
              <div className={styles.imgBox}>
                <img className={styles.listItemImg}src={deleteBtn} onClick={ev =>this.deleteConfirm(index)} alt=''/>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default EnterpriseManager;
