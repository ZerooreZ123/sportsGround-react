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
    }else{
      return false
    }
  }
  async deleteItem(i) {    // 删除员工项
    const result = await XHR.post(API.userAudit,{
      targetId:this.state.dataSource[i].id,
      passed:this.state.dataSource[i].passed,
      companyid:null
    })
    if(JSON.parse(result).success) {
      const list = this.state.dataSource;
      list.splice(i,1);
      this.setState({dataSource:this.state.dataSource});
    }else{
      alert('删除失败');
    }
  }
  async usreList() {     // 员工审核列表
    const result = await XHR.post(API.usreList,{
      id:this.props.match.params.userid
    });
    this.setState({dataSource: JSON.parse(result).data || []});
    if(JSON.parse(result).success === false) {
      alert(JSON.parse(result).msg);
    }
  }
  async userAudit(i){    // 审核员工
    if(this.state.dataSource[i].passed ==='Y') {
      this.state.dataSource[i].passed ='N'
    }else{
      this.state.dataSource[i].passed ='Y';
    }
    const result = await XHR.post(API.userAudit,{
      targetId:this.state.dataSource[i].id,
      id:this.state.dataSource[i].id,
      passed: this.state.dataSource[i].passed,
      companyid:this.state.dataSource[i].companyid
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
