<template>
  <div>
    <div class="head-search">
      <div class="head-search_searchBox" @click="goSearch">
        <i class="icon-search"></i>
        <yd-rollnotice autoplay="6000" speed="1000">
          <yd-rollnotice-item v-for="(item,index) in roollNoticeData" :key="item+index">
            {{item}}
          </yd-rollnotice-item>
        </yd-rollnotice>
      </div>
      <!--发布-->
      <div class="head-search_release" @click="releaseShow = true">
        <i class="icon-fabu"></i>
        <span class="release">发布</span>
      </div>
      <app-popup v-model="releaseShow" top="1.24rem" right="0.16rem" maskerOpacity="0" class="releasePopup">
        <div class="release-content">
          <ul>
            <li class="list" v-for="(item,index) in releaseContent" :key="index">
              <i :class="item.icon"></i>
              <span class="txt">{{item.txt}}</span>
            </li>
          </ul>
        </div>
      </app-popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      'app-popup': require('./popup/popup.vue').default
    },
    data() {
      return {
        roollNoticeData: [
          '停止英语等级考试',
          '苹果手机降级教程',
          '老梁故事汇音频',
          'skt改名'
        ],
        releaseContent: [
          {
            icon: 'icon-tuwen',
            txt: '发图文'
          },
          {
            icon: 'icon-paixiaoshipin',
            txt: '拍小视频'
          },
          {
            icon: 'icon-fashipin',
            txt: '发视频'
          },
          {
            icon: 'icon-tiwen',
            txt: '提问'
          },
          {
            icon: 'icon-kaizhibo',
            txt: '开直播'
          },
          {
            icon: 'icon-baoliao',
            txt: '爆料'
          }
        ],
        tabActiveIndex: 0,
        releaseShow: false
      }
    },
    methods: {
      openConfirm() {
        this.$dialog.confirm({
          title: '选填标题',
          mes: '我有一个小毛驴我从来也不骑！',
          opts: () => {
            this.$dialog.toast({ mes: '你点了确定', timeout: 1000 })
          }
        })
      },
      //去search页面
      goSearch() {
        this.$goRoute({
          name: 'search'
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../src/assets/styl/mixin.styl"
  .head-search
    height: 1rem
    display: flex
    padding: 0.1rem 0.2rem
    background-color: #ed4040
    .head-search_searchBox
      flex: 1
      border-radius: 3px
      background-color: #fff
      display: flex
      align-items: center
      padding: 0.08rem 0.2rem
      /deep/ .yd-rollnotice-item
        font-size: 0.30rem
    .head-search_release
      flex: 0 0 0.6rem
      color: #fff
      display: flex
      flex-direction: column
      justify-content: center
      margin-left: 0.18rem
      .icon-fabu
        font-size: 0.6rem
      .release
        text-align: center
        font-size: 0.2rem

    .releasePopup
        .release-content
          background-color: rgba(0, 0, 0, 0.8)
          padding: 0 0.24rem 0
          color: #fff
          border-radius: 4px
          position: relative
          &:after
            position: absolute
            content: ''
            width: 0
            height: 0
            right: 10px
            top: -10px
            border-left: 10px solid transparent
            border-right 10px solid transparent
            border-bottom: 10px solid rgba(0, 0, 0, 0.8)
          .list
            width: 2rem
            padding: 0.2rem 0
            display: flex
            align-items: center
            &:not(:last-child)
              border-1px(#e5e5e5)
            > i
              -font-size: 0.4rem
            .txt
              display: inline-block
              margin-left: 0.24rem
              font-size: 0.26rem
</style>
