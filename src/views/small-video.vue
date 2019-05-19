<template>
  <div id="app-small-video">
    <div class="head">
      <span class="head_left">
        <a href="javascript: void(0)" v-for="(item,index) in headArr" :key="index" class="item"
        :class="activeIndex===index?'active':''" @click="itemChange(index)">{{item.text}}</a>
      </span>
      <span class="head_right"><i class="icon-video"></i>发布</span>
    </div>
    <div class="body">
      <app-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval"
                 :threshold="threshold" :speed="speed"
                 v-model="activeIndex">
        <div v-for="(item,index) in headArr" :key="index">
          <!--关注部分-->
          <div v-if="item.text === '关注'" class="record">
            关注
          </div>
          <!--推荐部分-->
          <div v-if="item.text === '推荐'" class="LiveBroadcast">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollRecord"
                        @pullingUp="scrollUP('record')"
                        @pullingDown="scrollDN('record')">
              <app-list v-for="(item,index) in recordList" :key="index" :theme="item.theme">
                <template slot="title" v-if="item.title">{{item.title}}</template>
                <template slot="body" v-if="item.body">
                  <img :src="item.body.img" alt="">
                </template>
                <template slot="footer" v-if="item.footer">
                  <span class="play"><i class="icon-zhuanfa"></i>{{item.footer.play}}次播放</span>
                  <span class="like">{{item.footer.like}}赞</span>
                </template>
              </app-list>
            </app-scroll>
          </div>
          <!--附近部分-->
          <div v-if="item.text === '附近'" class="video">
            附近
          </div>
          <!--活动部分-->
          <div v-if="item.text === '活动'" class="video">
            活动
          </div>
          <!--游戏部分-->
          <div v-if="item.text === '游戏'" class="video">
            游戏
          </div>
        </div>
      </app-slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      'app-scroll': require('../components/scroll/scroll.vue').default,
      'app-list': require('../components/list/list.vue').default,
      'app-slide': require('../components/slider/slide.vue').default
    },
    data () {
      return {
        headArr: [
          {
            text: '关注',
            badge: true
          },
          {
            text: '推荐'
          },
          {
            text: '附近'
          },
          {
            text: '活动'
          },
          {
            text: '游戏'
          }
        ],
        activeIndex: 1,
        pullUpLoad: {
          txt: {
            more: '加载更多...',
            noMore: '~~~啦啦啦,没有更多数据啦！！!'
          },
          threshold: -25
        },
        pullDownRefresh: {
          more: '推荐中',
          success: '',
          threshold: 50,
          stop: 40
        },
        scrollRecord: 0,
        typeScroll: 'UP',
        recordList: [
          {
            id: 1,
            theme: 6,
            title: '随手一拍',
            body: {
              // img: 'https://via.placeholder.com/300x450/?text=video'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 2,
            theme: 6,
            title: '嘻嘻，递上请假条',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 5086
            }
          },
          {
            id: 3,
            theme: 6,
            title: '十年二百对个国家，有多少人敢想，而又有多少人能做或者敢做',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 4,
            theme: 6,
            title: '新娘有点像颖儿',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 5,
            theme: 6,
            title: '',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 6,
            theme: 6,
            title: '羡慕过，但没有尝试过',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 7,
            theme: 6,
            title: '看我2个月后，哼哼',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 8,
            theme: 6,
            title: '龙妈疯了，告诉我们一个道理',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 9,
            theme: 6,
            title: '头婚和二婚的区别',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          },
          {
            id: 10,
            theme: 6,
            title: '哦，我在干嘛呀',
            body: {
              // img: 'https://via.placeholder.com/300x700?text=img'
              img: require('../assets/image/300x450.png')
            },
            footer: {
              play: 3504,
              like: 84
            }
          }
        ],
        //app-slider
        turnToPrev: false,
        turnToNext: false,
        isAutoPlay: false,
        isLoop: false,
        isShowDot: false,
        speed: 400,
        threshold: 0.3,
        interval: 4000
      }
    },
    methods: {
      //head栏切换
      itemChange(val) {
        this.activeIndex = val
      },
      //更新数据
      async getPostList(type) {
        let self = this
        let num = Math.random() * 10
        let _list = []
        let count = parseInt(num)
        switch (type) {
          case 'record':
            while (count-- && count-- > 1) {
              _list.push(this.recordList[count])
            }
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.recordList = [...self.recordList, { theme: 1, time: 45 }, ..._list]
                self.scrollRecord < 0 ? self.scrollRecord = 1 : self.scrollRecord++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollRecord === 0 ? self.scrollRecord-- : self.scrollRecord = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollRecord <= 0 ? self.scrollRecord-- : self.scrollRecord++
                self.recordList = [..._list, { theme: 1, time: 45 }, ...self.recordList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollRecord <= 0 ? self.scrollRecord-- : self.scrollRecord++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
        }
      },
      //上拉加载
      scrollUP(type) {
        this.typeScroll = 'UP'
        switch (type) {
          case 'record':
            this.getPostList(type)
            break
        }
      },
      //下拉刷新
      scrollDN(type) {
        this.typeScroll = 'DN'
        switch (type) {
          case 'record':
            this.getPostList(type)
            break
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app-small-video
    position: absolute
    width: 100%
    top: 0
    bottom: 0.91rem
    background-color #fff
    .head
      height: 0.8rem
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 0.2rem
      position: relative
      &:after
          height: 1px
          position: absolute
          bottom: 0
          left: 0
          content: ''
          width: 100%
          background-image: linear-gradient(0deg, #e1e1e1 50%, transparent 50%);
      .head_left
        .item
          display: inline-block
          font-size: 0.28rem
          margin-right: 0.28rem
          &.active
            color: rgb(237, 64, 64)
      .head_right
          display: flex
          align-items: center
          font-size: 0.26rem
          >i
            font-size: 0.46rem
            margin-right: 0.1rem
    .body
      height: calc(100% - 0.8rem)
      .slide
        height: 100%
        /deep/ .slide-group
          height: 100%
          .slide-item
            height: 100%
            > div
              height: 100%
</style>
