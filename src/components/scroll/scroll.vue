<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
            <span>{{pullUpTxt}}</span>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
          <!--<span class="refresh">松开刷新</span>-->
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
            <span class="txt" v-if="refreshTxt">{{refreshTxt}}</span>
          </div>
          <div v-else class="success">
            <a href="javascript:void(0)">{{successTxt}}</a></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { getRect } from '../../../src/util/assist'

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'x'
  const DIRECTION_V = 'y'
  export default {
    name: COMPONENT_NAME,
    components: {
      loading: require('./loading.vue').default,
      bubble: require('./bubble.vue').default
    },
    props: {
      value: {
        type: Number,
        default: 1
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      listenScrollEnd: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: true
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      mouseWheel: {
        type: Boolean,
        default: false
      },
      bounce: {
        default: true
      },
      zoom: {
        default: false
      }
    },
    data() {
      return {
        scrollTNT: true,
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      pullUpTxt() {
        const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more
        const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore
        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        return this.pullDownRefresh && this.pullDownRefresh.more
      },
      successTxt() {
        return this.pullDownRefresh && this.pullDownRefresh.success
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    destroyed() {
      this.$refs.scroll && this.$refs.scroll.destroy()
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          mouseWheel: this.mouseWheel,
          bounce: this.bounce,
          zoom: this.zoom
        }
        this.scroll = new BScroll(this.$refs.wrapper, options)
        // this.$emit('onReadyScroll', this.scroll);
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scroll-end', pos)
          })
        }
        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })
          this.scroll.on('scrollStart', () => {
            this.$emit('scroll-start')
          })
        }
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate() {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
            this.enable()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = this.scrollTNT
          this.enable()
          this.refresh()
        } else {
          this.refresh()
        }
      },

      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.disable()
          this.$emit('pullingDown')
        })
        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            if (this.pullDownRefresh && this.pullDownRefresh.txt) {
              this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 0)}px`
            } else {
              this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 0)}px`
            }
          } else {
            this.bubbleY = 0
          }
          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.pullUpDirty = true
          this.disable()
          this.$emit('pullingUp')
        })
      },
      _reboundPullDown() {
        const { stopTime = 1000 } = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      value(val) {
        this.scrollTNT = val > 0
        console.log(this.scrollTNT, val)
        setTimeout(() => {
          this.forceUpdate()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .list-wrapper
    position: relative
    height: 100%
    overflow: hidden

  .pulldown-wrapper
    position: absolute
    width: 100%
    left: 0
    text-align: center
    transition: all
    height: 40px
    color: rgb(10, 10, 10)
    .before-trigger
      display: flex
      justify-content: center
      align-items: center
    .after-trigger
      height: 100%
      .loading
        height: 100%
        display: flex
        flex-direction: column
        padding: 0.16rem 0
        //justify-content: space-between
        .mf-loading-container
          display: flex
          justify-content: center
          align-items: center
        .txt
          display: inline-block
          font-size: 0.24rem
          transform: scale(0.8)
          position: relative
          top: 0.12rem
      .success
        height: 100%
        font-size: 0.28rem
        display: flex
        justify-content: center
        align-items: center
        background-color #99CCFF
  .pullup-wrapper
    font-size: 0.24rem
    text-align: center
    color: rgb(10, 10, 10)
    .before-trigger
      height: 25px
      display: flex
      align-items: center
      justify-content: center
    .after-trigger
      display: flex
      justify-content: center
      align-items: center
      .mf-loading-container
        display: flex
        justify-content: center
        align-items: center
</style>
