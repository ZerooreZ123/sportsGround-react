import React, { Component } from 'react';


import styles from '../styles/About.css';

import logo from '../asset/about/logo.png';
import websiteImg from '../asset/about/wangzhi.png';
import img01 from '../asset/about/img (1).jpg';
import img02 from '../asset/about/img (2).jpg';
import img03 from '../asset/about/img (3).jpg';
import img04 from '../asset/about/img (4).jpg';
import img05 from '../asset/about/img (5).jpg';
import img06 from '../asset/about/img (6).jpg';
import img07 from '../asset/about/img (7).jpg';
import img08 from '../asset/about/img (8).jpg';
import img09 from '../asset/about/img (9).jpg';
import img10 from '../asset/about/img (10).jpg';
import img11 from '../asset/about/img (11).jpg';
import img12 from '../asset/about/img (12).jpg';

class About extends Component {
  componentDidMount(){
    document.querySelector('title').innerText = '关于我们';
  }
  render() {
    return (
      <div>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="" />
          <img className={styles.websiteImg} src={websiteImg} alt="" />
        </div>
        <div className={styles.panel}>
          <div>
            <img className={styles.contentImg} src={img01} alt="" />
          </div>
          <div className={styles.contentText}>
            &emsp;&emsp;垠坤·星火E方，位于南京高新区核心发展地段，5.5万方创新创业高地。
            创客SOHO和5个总部独栋组成，以“互联网创新”为主导产业，重点集聚“智能硬件、移动应用、电子商务”等企业。
            项目以“助力企业成长”为出发点，建立完善的企业服务体系，并整合多方资源创新型开展独角兽创业计划，
            励志打造适宜创新型企业成长的品格型、创意式、功能化的互联网产业集聚区。
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.contentText}>
            关键词一：黄金区位
            <br />
            &emsp;&emsp;地标在南京高新区星火路20号，紧邻星火路地铁站200米，
            让理想奋斗的人不再疲于出行，而是更多精力投入工作本身。
            周边有3300多家高新技术企业做邻居，让创业更有动力。
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.flexContainer}>
            <div><img className={styles.contentImgGrid} src={img02} alt="" /></div>
            <div><img className={styles.contentImgGrid} src={img03} alt="" /></div>
            <div><img className={styles.contentImgGrid} src={img04} alt="" /></div>
            <div><img className={styles.contentImgGrid} src={img05} alt="" /></div>
          </div>
          <div className={styles.contentText}>
            关键词二：创意LOFT
            <br />
            &emsp;&emsp;40-200㎡的开放型LOTF办公，让脑细胞最大限度的燃烧，还有什么比这个更激情？
          </div>
        </div>

        <div className={styles.panel}>
          <div>
            <img className={styles.contentImg} src={img06} alt="" />
          </div>
          <div className={styles.contentText}>
            关键词三：总部别墅
            <br />
            &emsp;&emsp;1200-2100独栋花园办公房，当你一下子无法释放创造力，就先来露台和阳台释放下心情。
          </div>
        </div>

        <div className={styles.panel}>
          <div>
            <img className={styles.contentImg} src={img07} alt="" />
          </div>
          <div className={styles.contentText}>
            关键词四：众创空间
            <br />
            &emsp;&emsp;2500㎡的孵化交流空间，欢迎来自“互联网、大数据、智能制造界”的你们，一起打开头盖骨、放开双手，搞事情！
          </div>
        </div>

        <div className={styles.panel}>
          <div>
            <img className={styles.contentImg} src={img08} alt="" />
          </div>
          <div className={styles.contentText}>
            关键词五：产业培训空间
            <br />
            &emsp;&emsp;当你脑力余额不足时，来这里充充电吧！目前，已经引入培训平台：南京国匠到场。
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.flexContainer}>
            <div><img className={styles.contentImgGrid} src={img09} alt="" /></div>
            <div><img className={styles.contentImgGrid} src={img10} alt="" /></div>
          </div>
          <div className={styles.contentText}>
            关键词六：匠心硬件
            <br />
            &emsp;&emsp;闷在办公室会发霉，到交流空间（TOLD创业者水吧、不同规格的创业会议室）
            来聊聊创业心得、到休闲空间(智慧运动场、健身室、发泄室)释放下活力。
          </div>
        </div>

        <div className={styles.panel}>
          <div>
            <img className={styles.contentImg} src={img11} alt="" />
          </div>
          <div className={styles.contentText}>
            关键词七：独角兽计划
            <br />
            &emsp;&emsp;2016中国南京互联网与工业融合高峰论坛
          </div>
        </div>

        <div className={styles.panel}>
          <div>
            <img className={styles.contentImg} src={img12} alt="" />
          </div>
          <div className={styles.contentText}>
            连线硅谷——2016南京互联网+创新创业沙龙
            <br />
            &emsp;&emsp;没有创友是孤独的，没有导师是无助的，让小兽酱帮你！
            独角兽计划是由垠坤·星火E方联合南京创客联盟、南京大数据产业协会共同发起的，
            专注为互联网企业和创客，提供一个产业交流、技术学习、业务合作的平台。该计划的活动矩阵，
            每周2场创业活动、每月1场产业交流大会，已成为星火E方的重要品牌活动。
            <br />
            嘿，创友，
            <br />
            &emsp;&emsp;2017创业风雨无阻，垠坤·星火E方互联网创新园陪你披荆斩棘，愿做你的创业革命根据地。
          </div>
        </div>

        <div className={styles.bottomText}>
          <div>我们有更多的办公优惠方案供您选择！</div>
          <div>撩我们：52802766</div>
          <div>找我们：南京高新区星火路20号（3号线星火路站向南200米）</div>
          <div>联系电话：400-1188-891</div>
        </div>

      </div>
    );
  }
}

export default About;