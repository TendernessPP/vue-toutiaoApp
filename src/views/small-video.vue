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
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollLNearby"
                        @pullingUp="scrollUP('LiveNearby')"
                        @pullingDown="scrollDN('LiveNearby')">
              <app-list v-for="(item,index) in LiveNearby" :key="index" :theme="item.theme" :class="item.fullScreen?'is-fullScreen':''">
                  <template slot="top" v-if="item.top">
                    <div class="top_left">
                      <div class="img-wrapper">
                        <img :src="item.top.avata" alt="">
                      </div>
                      <div class="title">
                        <span class="name">{{item.top.name}}</span>
                        <span class="fan">{{item.top.distance}}</span>
                      </div>
                    </div>
                    <div class="top_right">
                      <span style="color: #ef4f4f;margin-right: 0.4rem;font-weight: 600">关注</span>
                      <span class="delete"><i class="icon-guanbi"></i></span>
                    </div>
                  </template>
                <template slot="title">{{item.title}}</template>
                  <template slot="body" v-if="item.body">
                    <div class="img-wrapper">
                      <img :src="item.body.img" alt="">
                    </div>
                  </template>
                  <template slot="footer" v-if="item.footer">
                    <span class="forward"><i class="icon-zhuanfa"></i>{{item.footer.forward}}</span>
                    <span class="comment"><i class="icon-62"></i>{{item.footer.comment}}</span>
                    <span class="like"><i class="icon-dianzan"></i>{{item.footer.like}}</span>
                  </template>
              </app-list>
            </app-scroll>
          </div>
          <!--活动部分-->
          <div v-if="item.text === '活动'" class="activity">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollLActivity"
                        @pullingUp="scrollUP('activity')"
                        @pullingDown="scrollDN('activity')">
            <div class="slide-wrapper">
              <app-slide ref="slide" :autoPlay="isAutoPlayActivity" :loop="isLoopActivity" :showDot="isShowDotActivity" :interval="intervalActivity"
                         :threshold="thresholdActivity" :speed="speedActivity"
                         v-model="activeIndexActivity">
                <div class="imgWrapper" v-for="(item,index) in activityImg" :key="index">
                  <img :src="item.img" alt="">
                </div>
              </app-slide>
              <app-list v-for="(item,index) in activityList" :key="index" :theme="item.theme">
                <template slot="top" v-if="item.top">
                  <div class="top_left">
                    <div class="img-wrapper">
                      <img :src="item.top.avata" alt="">
                    </div>
                    <div class="title">
                      <span class="name">{{item.top.name}}</span>
                      <span class="desc">{{item.top.desc}}</span>
                    </div>
                  </div>
                  <div class="top_right">
                    <span style="color: rgba(0,0,0,.5);border-radius: 4px;padding:0.04rem 0.08rem;background-color: rgba(0,0,0,.1);margin-right: 0.1rem;font-weight: 600">{{item.top.count}}个视频</span>
                    <i class="icon-youjiantou" style="font-size: 0.4rem;"></i>
                  </div>
                </template>
                <template slot="body" v-if="item.body">
                  <div class="img-wrapper">
                    <img :src="imgs.img" alt="" v-for="(imgs,index) in item.body" :key="index">
                  </div>
                </template>
              </app-list>
            </div>
            </app-scroll>
          </div>
          <!--游戏部分-->
          <div v-if="item.text === '游戏'" class="games">
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
    data() {
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
            noMore: ''
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
        scrollLNearby: 0,
        scrollLActivity: 0,
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
        LiveNearby: [
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 2,
            theme: 5,
            title: '可乐能不能就看你们啦，听说涨到一千粉丝视频就能比较长，快快快。。。我想拍长视频',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 1,
            theme: 5,
            title: '我很喜欢的女明星，不知道有没有和我一样的',
            fullScreen: true,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              distance: '<1km'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/80x80.png')
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          }
        ],
        //app-slider
        isAutoPlay: false,
        isLoop: false,
        isShowDot: false,
        speed: 400,
        threshold: 0.3,
        interval: 4000,
        //activity
        activeIndexActivity: 0,
        isAutoPlayActivity: true,
        isLoopActivity: true,
        isShowDotActivity: true,
        speedActivity: 400,
        thresholdActivity: 0.3,
        intervalActivity: 4000,
        activityImg: [
          {
            img: require('../assets/image/banner_1.jpg')
          },
          {
            img: require('../assets/image/banner_2.jpg')
          }
        ],
        activityList: [
          {
            id: 1,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '头条钓鱼王',
              desc: '热门活动',
              count: 4550
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 2,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '欢乐同行',
              desc: '热门活动',
              count: 105
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 3,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '头条带你游江西',
              desc: '热门活动',
              count: 350
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 4,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '萌宠视频',
              desc: '热门活动',
              count: 127
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 5,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '婚礼',
              desc: '热门活动',
              count: 999
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 6,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '头条钓鱼王',
              desc: '热门活动',
              count: 4550
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 7,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '欢乐同行',
              desc: '热门活动',
              count: 105
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 8,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '头条带你游江西',
              desc: '热门活动',
              count: 350
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 9,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '萌宠视频',
              desc: '热门活动',
              count: 127
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          },
          {
            id: 10,
            theme: 7,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '婚礼',
              desc: '热门活动',
              count: 999
            },
            body: [
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              },
              {
                img: require('../assets/image/80x80.png')
              }
            ]
          }
        ]
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
        // let num = Math.random() * 10
        let num = 8
        let _list = []
        let count = parseInt(num)
        switch (type) {
          case 'record':
            while (count--) {
              console.log(count)
              _list.push(this.recordList[count])
            }
            console.log(_list)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.recordList = [...self.recordList, ..._list]
                self.scrollRecord < 0 ? self.scrollRecord = 1 : self.scrollRecord++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollRecord === 0 ? self.scrollRecord-- : self.scrollRecord = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollRecord <= 0 ? self.scrollRecord-- : self.scrollRecord++
                self.recordList = [..._list, ...self.recordList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollRecord <= 0 ? self.scrollRecord-- : self.scrollRecord++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
          case 'LiveNearby':
            while (count--) {
              console.log(count)
              _list.push(this.LiveNearby[count])
            }
            console.log(_list)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.LiveNearby = [...self.LiveNearby, ..._list]
                self.scrollLNearby < 0 ? self.scrollLNearby = 1 : self.scrollLNearby++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollLNearby === 0 ? self.scrollLNearby-- : self.scrollLNearby = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollLNearby <= 0 ? self.scrollLNearby-- : self.scrollLNearby++
                self.LiveNearby = [..._list, ...self.LiveNearby]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollLNearby <= 0 ? self.scrollRecord-- : self.scrollLNearby++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
          case 'activity':
            while (count--) {
              console.log(count)
              _list.push(this.activityList[count])
            }
            console.log(_list)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.activityList = [...self.activityList, ..._list]
                self.scrollLActivity < 0 ? self.scrollLActivity = 1 : self.scrollLActivity++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollLActivity === 0 ? self.scrollLActivity-- : self.scrollLActivity = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollLActivity <= 0 ? self.scrollLActivity-- : self.scrollLActivity++
                self.activityList = [..._list, ...self.activityList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollLActivity <= 0 ? self.scrollLActivity-- : self.scrollLActivity++
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
          case 'LiveNearby':
            this.getPostList(type)
            break
          case 'activity':
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
          case 'LiveNearby':
            this.getPostList(type)
            break
          case 'activity':
            this.getPostList(type)
            break
        }
      }
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
        > i
          font-size: 0.46rem
          margin-right: 0.1rem
    .body
      height: calc(100% - 0.8rem)
      overflow: hidden//防止出现屏幕可以左右拖拽
      .video
        background-color: rgba(0,0,0,.1)
      .activity
        .slide-wrapper
          .slide
            height: auto
            /deep/ .dots
              position relative
              bottom: 15px
              width: 100%
          .imgWrapper
            >img
                width: 100%
      .slide
        height: 100%
        /deep/ .slide-group
          height: 100%
          .slide-item
            height: 100%
            > div
              height: 100%
</style>
