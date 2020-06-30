<template>
  <div class="detail-goods-comment" v-if="info">
    <div class="gc-top">
      <span class="title">用户评价</span>
      <span class="more" @click="showMore">更多({{ info.cRate | filterRateNumber }})</span>
    </div>
    <div class="gc-main">
      <div class="item" v-for="item in info.list" :key="item.content">
        <div class="user-info">
          <img class="logo" :src="item.user.avatar">
          <span class="name">{{ item.user.uname }}</span>
        </div>
        <div class="content">
          <p>{{ item.content }}</p>
          <div class="explain" v-if="item.explain">{{ item.explain }}</div>
          <div class="img-list" v-if="item.images">
            <div class="item" v-for="src in item.images" :key="src" @click="$emit('img-click', src)">
              <img :src="src" />
            </div>
          </div>
        </div>
        <div class="more-info">{{ getMoreInfoText(item) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsComment',
  props: ['info'],
  methods: {
    showMore() {
      this.$toast.show('该功能暂未开放');
    },
    getMoreInfoText(item) {
      const createTime = formatTime(item.created * 1000);
      const style = item.style || '';
      const extraInfo = item.extraInfo ? item.extraInfo.reduce((p, c) => p + c + ' ', '') : '';

      return `${createTime} ${style + extraInfo}`;
    }
  },
  filters: {
    filterRateNumber(num) {
      return num > 99 ? '99+' : num;
    }
  }
}

function formatTime(time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = helpFormatTime(date.getMonth() + 1);
  const day = helpFormatTime(date.getDate());
  const hours = helpFormatTime(date.getHours());
  const minutes = helpFormatTime(date.getMinutes());
  const seconds = helpFormatTime(date.getSeconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
function helpFormatTime(num) {
  return num > 9 ? num : '0' + num;
}
</script>

<style lang="scss" scoped>
  .detail-goods-comment {
    padding: 6vw 3vw;
    border-bottom: 5px solid #aaa;

    .gc-top {
      padding-bottom: 3vw;
      border-bottom: 1px solid #eee;
      display: flex;

      span {
        flex: 1;
      }
      .more {
        text-decoration: underline;
        text-align: right;
      }
    }
    .gc-main .item {
      .user-info {
        padding: 3vw 0;
        display: flex;
        align-items: center;

        .logo {
          height: 46px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .content {
        p {
          text-align: justify;
          text-indent: 2em;
          margin-bottom: 3vw;
        }
        .explain {
          font-size: 14px;
          text-align: justify;
          margin-bottom: 3vw;
          padding: 2vw 3vw;
          color: #2b2b2b;
          background-color: rgb(179, 230, 78);
          border-radius: 3px;
        }
        .img-list {
          margin-bottom: 3vw;
          overflow: hidden;

          .item {
            float: left;
            width: 22.75vw;
            height: 30vw;
            margin-right: 1vw;
            overflow: hidden;
            &:nth-child(4n+4) {
              margin-right: 0;
            }
            img {
              height: 100%;
            }
          }
        }
      }
      .more-info {
        font-size: 14px;
      }
    }
  }
</style>