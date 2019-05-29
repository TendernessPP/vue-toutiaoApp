<template>
  <div id="me">
    <app-scroll :pullUpLoad="false" :pullDownRefresh="false">
      <!--用户信息-->
      <div class="me-head">
        <div class="me-head_info">
          <div class="me-head_info-wrapper">
            <img :src="userDetail.avata" alt="" class="avata">
            <div class="name-status">
              <span class="userName">{{userDetail.name}}</span>
              <span class="status">申请验证</span>
            </div>
          </div>
          <i class="icon-youjiantou"></i>
        </div>
        <div class="me-head_count">
          <div class="item">
            <span class="item-count">{{userDetail.count.toutiao}}</span>
            <span class="item-txt">头条</span>
          </div>
          <div class="item">
            <span class="item-count">{{userDetail.count.guanzhu}}</span>
            <span class="item-txt">关注</span>
          </div>
          <div class="item">
            <span class="item-count">{{userDetail.count.fensi}}</span>
            <span class="item-txt">粉丝</span>
          </div>
          <div class="item">
            <span class="item-count">{{userDetail.count.huozan}}</span>
            <span class="item-txt">获赞</span>
          </div>
        </div>
      </div>
      <!--用户记录-->
      <div class="me-recording">
        <div class="item">
          <i class="icon-xingxing" style="color: red"></i>
          <span class="item-txt">我的收藏</span>
        </div>
        <div class="item">
          <i class="icon-pinglun1" style="color: blue;"></i>
          <span class="item-txt">我的评论</span>
        </div>
        <div class="item">
          <i class="icon-dianzan1" style="color: green"></i>
          <span class="item-txt">我的点赞</span>
        </div>
        <div class="item">
          <i class="icon-lishijilu1" style="color: lawngreen;"></i>
          <span class="item-txt">浏览历史</span>
        </div>
      </div>
      <!--通知-->
      <div class="me-notice">
        <yd-cell-group>
          <yd-cell-item arrow>
            <span slot="left">我的钱包</span>
            <span slot="right">话费优惠，速充值</span>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">消息通知</span>
            <span slot="right"></span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <!--扫一扫-->
      <div class="me-scan">
        <yd-cell-group>
          <yd-cell-item arrow>
            <span slot="left">扫一扫</span>
            <span slot="right"></span>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">免流量服务</span>
            <span slot="right"></span>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">阅读公益</span>
            <span slot="right">今日阅读48分钟</span>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">广告投放</span>
            <span slot="right"></span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <!--设置-->
      <div class="me-setting">
        <yd-cell-group>
          <yd-cell-item arrow>
            <span slot="left">用户反馈</span>
            <span slot="right"></span>
          </yd-cell-item>
          <yd-cell-item arrow>
            <span slot="left">系统设置</span>
            <span slot="right"></span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
    </app-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      'app-scroll': require('../components/scroll/scroll.vue').default
    },
    data() {
      return {
        userDetail: {
          name: 'Dennis',
          avata: require('../assets/image/80x80.png'),
          count: {
            toutiao: 0,
            guanzhu: 7,
            fensi: 0,
            huozan: 0
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #me
    position: absolute
    font-size: 0.28rem
    width: 100%
    top: 0
    bottom: 0.91rem
    background-color #fafafa
    .me-head
      background-color: #fff
      //margin: 0 0.2rem
      padding: 0.24rem 0
      .me-head_info
        margin: 0 0.2rem
        display: flex
        justify-content: space-between
        align-items: center
        .me-head_info-wrapper
          display: flex
          align-items: center
          margin-left: 0.3rem
          .avata
            width: 1rem
            border-radius: 50%
          .name-status
            display: flex
            flex-direction: column
            margin-left: 0.24rem
            .status
              font-size: 0.24rem
              margin-top: 0.08rem
              transform: scale(.8)
              background-color: rgb(237, 64, 64)
              padding: 0.08rem 0.1rem
              position: relative
              left: -0.08rem
              border-radius: 4px
              color: rgba(255,255,255,.8)
              font-weight: 600
      .me-head_count
        display: flex
        margin-top: 0.24rem
        .item
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          .item-txt
            margin-top: 0.24rem
    .me-recording
      background-color: #fff
      display: flex
      margin-top: 0.12rem
      margin-bottom: 0.12rem
      padding: 0.16rem 0
      .item
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .item-txt
            margin-top: 0.1rem
    .me-notice
      .yd-cell-box
        margin-bottom: 0.12rem
    .me-scan
      .yd-cell-box
        margin-bottom: 0.12rem
    .me-setting
      .yd-cell-box
        margin-bottom: 0
</style>
