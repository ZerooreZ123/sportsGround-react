import React,{Component}from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/QrCode.css';

class QrCode extends Component {
    componentDidMount() {
        document.querySelector('title').innerText = '二维码';
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.qrcodeBox}>
                        <QRCode size={150} value={"www.junl.cn/Code?userid="+this.props.match.params.userid}/>  
                        <div className={styles.prompt}>提示: 凭此二维码进入</div>
                    </div>
                </div>
           </div>   
        );
    }
}   
export default QrCode;
