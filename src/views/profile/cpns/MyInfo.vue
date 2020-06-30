<template>
  <div class="my-info">
    <div class="img-box">
      <img src="./imgs/userInfo/userImg.jpg" />
      <span>小团团</span>
    </div>
    <div class="my-order">
      <span>我的订单</span>
      <span>查看全部订单 ></span>
    </div>
    <div class="my-line">
      <div>
        <img src="./imgs/userInfo/daifukuan.svg" />
        <span>待付款</span>
      </div>
      <div>
        <img src="./imgs/userInfo/daifahuo.svg" />
        <span>待发货</span>
      </div>
      <div>
        <img src="./imgs/userInfo/daishouhuo.svg" />
        <span>待收货</span>
      </div>
      <div>
        <img src="./imgs/userInfo/daipingjia.svg" />
        <span>待评价</span>
      </div>
      <div>
        <img src="./imgs/userInfo/tuikuan.svg" />
        <span>退款/售后</span>
      </div>
    </div>
    <div class="options">
      <div>
        <img src="./imgs/options/dizhi.svg" />
        <span>收货地址</span>
      </div>
      <div>
        <img src="./imgs/options/kefu.svg" />
        <span>联系客服</span>
      </div>
      <div>
        <img src="./imgs/options/youli.svg" />
        <span>邀请有礼</span>
      </div>
      <div>
        <img src="./imgs/options/jifen.svg" />
        <span>积分兑换</span>
      </div>
      <div>
        <img src="./imgs/options/quan.svg" />
        <span>优惠券</span>
      </div>
      <div>
        <img src="./imgs/options/chuzhika.svg" />
        <span>储值卡</span>
      </div>
    </div>
    <div class="more-options">
      <div>
        <img src="./imgs/more/wenhao.svg" />
        <span>常见问题</span>
      </div>
      <div>
        <img src="./imgs/more/tuandui.svg" />
        <span>关于我们</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInfo'
}
</script>

<style lang="scss" scoped>
  .my-info {
    font-size: 3.8vw;

    .img-box {
      height: 25vh;
      background: linear-gradient(rgb(255, 136, 39), rgb(255, 180, 95));
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 20vw;
        border-radius: 50%;
      }
      span {
        color: rgba(255, 255, 255, .85);
      }
    }
    .my-order {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      background-color: #ffdc42;
      border-bottom: 1px solid orange;

      span:first-child {
        font-weight: bold;
      }
      span:last-child {
        color: #aaa;
      }
    }
    .my-line, .options {
      display: flex;
      padding: 10px 0;
      background-color: #ffdc42;
      div {
        font-size: 14px;
        text-align: center;

        img {
          display: block;
          margin: 0 auto;
        } 
      }
    }
    .my-line {
      border-bottom: 1px solid orange;
      
      div {
        flex: 1;
        img { width: 40%; }  
      }
    }
    .options {      
      flex-wrap: wrap;
      margin: 10px 0;
      border: {
        width: 1px;
        style: solid;
        color: orange;
        left: none;
        right: none;
      }

      div {
        width: 33%;
        img { width: 30%; }
      }
    }
    .more-options {      
      background-color: #ffdc42;
      border: {
        width: 1px;
        style: solid;
        color: orange;
        left: none;
        right: none;
      }

      div {
        padding: 10px;
        border-bottom: 1px solid orange;
        position: relative;
        &:last-child { border-bottom: none; }
        &:after {
          content: '>';
          position: absolute;
          top: 10px;
          right: 10px;
        }

        img {          
          height: 1.2em;
          vertical-align: bottom;
        }
      }
    }
  }
</style>