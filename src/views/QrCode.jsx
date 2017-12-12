import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import styles from '../styles/QrCode.css';

const QrCode = props =>{
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.qrcodeBox}>
                    <QRCode size={150} value="this.props.match.params.id"/>
                    <div className={styles.prompt}>提示:凭此二维码进入</div>
                </div>
            </div>
        </div>
    )  
}
export default QrCode;