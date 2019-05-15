<template>
  <div id="search">
    <div class="head-search">
      <div class="head-search_searchBox">
        <form action="#" class="search-input" @submit.prevent="submit">
          <i class="icon-search"></i>
          <yd-input
            type="search"
            :placeholder="placeholder"
            v-model="currentValue"
            ref="search"
          ></yd-input>
        </form>
      </div>
      <a href="javascript:;" class="head-search_cancel" @click="cancel">取消</a>
    </div>
    <div class="scroll">
      <app-scroll>
        <div class="search-recommend" v-if="!recordHideControl">
          <span v-for="(item,index) in searchRecommend" :key="index" class="item">{{item}}</span>
        </div>
        <div class="history-record">
          <div class="history-record_head">
            <a @click="historyRecordMore" href="javascript: void(0)">历史记录<i :class="iconShow?'icon-arrow-up':'icon-arrow-down'"></i></a>
            <i class="icon-shanchu"></i>
          </div>
          <div class="history-record_body" :class="iconShow?'history-record-more':''">
            <span class="item" v-for="(item,index) in historyRecord" :key="index">{{item}}</span>
          </div>
        </div>
        <div class="more-record" v-if="!recordHideControl">
          <span class="item" v-for="(item,index) in historyRecord" :key="index">{{item}}</span>
          <a class="item hide" href="javascript: void(0)" @click="recordHide"><i class="icon-shanchu"></i>隐藏推荐词</a>
        </div>
        <a href="javascript: void(0)" v-if="recordHideControl" class="show"
        @click="recordShow"><i class="icon-shanchu"></i>查看全部推荐词</a>
      </app-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      'app-scroll': require('../components/scroll/scroll.vue').default
    },
    data() {
      return {
        searchRecommend: ['优速董事长妻子身亡', '携号转网流程', '郭德纲于谦相声合集', '辣椒炒秋葵教学视频'],
        historyRecord: ['苹果手机降级教程', 'NBA', '柠檬干的正确泡发', '胸闷气短是怎么回事', '小米粥的做法', '多罗罗', '怎么吃能防癌', '黑洞照片', '剁椒鱼头的做法', '股市今日行情', '烈士亲人你在哪里', 'GRF大战STK', '退休工资计算法', '天气预报', '男士短发发型图'],
        currentValue: '',
        placeholder: '搜索',
        recordHideControl: false,
        iconShow: false //历史记录小图标
      }
    },
    methods: {
      //取消
      cancel() {
        this.$router.go(-1)
      },
      //提交
      submit() {
        console.log(this.$refs.search.setBlur())
        this.$refs.search.setBlur()
      },
      //更多历史记录
      historyRecordMore() {
        this.iconShow = !this.iconShow
      },
      //隐藏推荐词
      recordHide() {
        this.recordHideControl = true
      },
      //查看全部推荐词
      recordShow() {
        this.recordHideControl = false
      }
    },
    mounted() {
      this.$nextTick(() => {
        // console.log(this.$refs.search.setFocus())
        this.$refs.search.setFocus()
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/styl/mixin.styl"
  #search
    height: 100%
    width: 100%
    background-color: #fff
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
        .search-input
          width: 100%
          display: flex
          align-items: center
      .head-search_cancel
        flex: 0 0 0.6rem
        margin-left: 0.22rem
        display: flex
        justify-content: center
        align-items: center
        color: #fff
        font-size: 0.28rem
    .scroll
      height: calc(100% - 1rem)
      .search-recommend
        margin: 0 0.2rem
        padding-top: 0.1rem
        padding-bottom: 0.16rem
        border-1px(#e5e5e5)
        .item
          font-size: 0.30rem
          display: inline-block
          width: 50%
          padding: 0.16rem 0 0.16rem 0
          &:nth-child(odd)
            position: relative
            &:after
              content: ''
              position: absolute
              top: 50%
              right: 0
              width: 1px
              height: 50%
              transform: translate(0, -50%)
              background-image: linear-gradient(to right, #e5e5e5 50%, transparent 50%)
          &:nth-child(even)
            padding-left: 0.2rem
      .history-record
        margin: 0 0.2rem
        .history-record_head
            padding: 0.2rem 0
            display: flex
            justify-content: space-between
            >a
              display: flex
              align-items: center
              font-size: 0.24rem
              .icon-arrow-down,.icon-arrow-up
                  font-size: 0.4rem
            .icon-shanchu
                font-size: 0.4rem
        .history-record_body
          height: 1.9rem
          overflow: hidden
          border-1px(#e5e5e5)
          &.history-record-more
            height: auto
          .item
            font-size: 0.30rem
            display: inline-block
            width: 50%
            padding: 0.16rem 0 0.16rem 0
            &:nth-child(odd)
              position: relative
              &:after
                content: ''
                position: absolute
                top: 50%
                right: 0
                width: 1px
                height: 50%
                transform: translate(0, -50%)
                background-image: linear-gradient(to right, #e5e5e5 50%, transparent 50%)
            &:nth-child(even)
              padding-left: 0.2rem
      .more-record
        margin: 0 0.2rem
        padding-top: 0.1rem
        .item
          font-size: 0.30rem
          display: inline-block
          width: 50%
          padding: 0.16rem 0 0.16rem 0
          &:nth-child(odd)
            position: relative
            &:after
              content: ''
              position: absolute
              top: 50%
              right: 0
              width: 1px
              height: 50%
              transform: translate(0, -50%)
              background-image: linear-gradient(to right, #e5e5e5 50%, transparent 50%)
          &:nth-child(even)
            padding-left: 0.2rem
          &.hide
            .icon-shanchu
              position: relative
              top: 0.08rem
      .show
        display: flex
        justify-content: center
        align-items: center
        padding: 0.2rem 0
        font-size: 0.28rem
        color: #666
</style>
