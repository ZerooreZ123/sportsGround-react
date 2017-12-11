
// const admin = 'http://192.168.1.170:18080/'
// const admin = 'http://106.14.28.70/'
const admin ="http://www.junl.cn/"
const API = {
  oauthLogin: admin + 'SRM/f/yk/api/oauthLogin.do',
  siteDate: admin + 'SRM/f/yk/api/site/date.do',
  siteInfo: admin + 'SRM/f/yk/api/site/siteInfo.do',
  sitePrice: admin + 'SRM/f/yk/api/site/price.do',
  conpon: admin + 'SRM/f/yk/api/conpon.do',
  orderPredetermine: admin + 'SRM/f/yk/api/order/predetermine.do',
  orderPay: admin + 'SRM/f/yk/api/order/pay',
  orderPaySuccess: admin + 'SRM/f/yk/api/order/paySuccess',
  orderRechare: admin + 'SRM/f/yk/api/order/rechare',
  orderRechareSuccess: admin + 'SRM/f/yk/api/order/rechareSuccess',
  orderRechareRecords: admin + 'SRM/f/yk/api/order/rechareRecords.do',
  editUserInfo: admin + 'SRM/f/yk/api/editUserInfo.do',
  Balance: admin + 'SRM/f/yk/api/balance.do',
  siteRecords: admin + 'SRM/f/yk/api/site/records.do',
  usreList: admin + 'SRM/f/yk/api/usre/list.do',
  userAudit: admin + 'SRM/f/yk/api/user/audit.do',
  companyList:admin + 'SRM/f/yk/api/companyList',
  payList:admin + 'SRM/f/yk/api/payList.do',
  orderRefund: admin + 'SRM/f/yk/api/order/refund',
  getUser: admin + 'SRM/f/yk/api/getUser.do'
};
  
export {
  admin
}
export default API