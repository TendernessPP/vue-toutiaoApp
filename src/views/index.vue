<template>
  <div id="app-index">
    <!--首页头部搜索栏-->
    <app-head-search></app-head-search>
    <!--滚动nav栏-->
    <app-scroll-tab :navList="navList" v-model="active" :item-click="itemClick" font-size="0.32rem"
                    font-color="#0a0a0a" padding="0.20rem" ref="scrollTab" height="0.8rem" special></app-scroll-tab>
    <!--type栏-->
    <div class="type" @click="typeChannel = true">
      <i class="icon-type"></i>
    </div>
    <!--type显示栏-->
    <yd-popup v-model="typeChannel" position="bottom" height="100%" class="type-popup">
      <div slot="top" class="top">
        <i class="icon-guanbi" @click="typeChannel = false"></i>
      </div>
      <div class="scroll-no_scroll">
        <app-scroll>
          <div class="my-channel_head">
            <div class="channel_head">我的频道 <span>{{chanelTxt}}</span></div>
            <yd-button type="primary" size="mini" color="#ed4040" @click.native="btnClk">{{btnChange}}</yd-button>
          </div>
          <div class="my-channel_list">
            <a href="javascript: void(0)" class="my-channel_item" v-for="(item,index) in navList" :key="index">{{item.text}}
              <i class="icon-delete" v-show="!btnChannel&&index!==0&&index!==1" @click="channelDelete(item,index)"></i></a>
          </div>
          <div class="recommend_head">
            <div class="channel_head">频道推荐 <span>点击添加频道</span></div>
          </div>
          <div class="recommend_list">
            <a href="javascript: void(0)" class="recommend_item" v-for="(item,index) in recommendList" :key="index"
               @click="addChannel(item,index)" :class="item.isLong?'is-long':''"><i
              class="icon-jiahao"></i>{{item.text}}</a>
          </div>
        </app-scroll>
      </div>
    </yd-popup>
    <!--body上拉刷新，下拉加载-->
    <div class="body">
      <!--<yd-slider autoplay="0" :show-pagination="false" :loop="false" :index="active" :callback="activeChange"
                 :speed="400">
        <yd-slider-item v-for="(item,index) in navList" :key="index">
          <template v-if="item.text === '视频'">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scroll"
                        @pullingUp="scrollUP"
                        @pullingDown="scrollDN">
              <app-list v-for="(item,index) in bodyList" :key="index" :theme="item.theme">
                <template v-if="item.id">
                  <img :src="item.img" alt="" slot="img">
                  <span slot="title">{{item.title}}</span>
                  <span slot="bofang">{{item.bofang}}次播放</span>
                  <span slot="time">{{item.time|formatTime}}</span>
                  <div slot="other" class="list-bottom" >
                    <div class="list-bottom_left">
              <span class="avata">
                <img :src="item.avata" alt="">
              </span>
                      <span class="name">{{item.name}}</span>
                      <span class="attention">{{item.attention|filterComment}}</span>
                    </div>
                    <div class="list-bottom_right">
                      <span class="comment"><i class="icon-62"></i>{{item.comment}}</span>
                      <span class="operating">
                  <i class="icon-more" @click="clickOperating"></i>
                </span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  &lt;!&ndash;提示&ndash;&gt;
                  <div  class="prompt" slot="other">
                    <span class="time">{{item.time}}</span>前看到这里&nbsp&nbsp&nbsp&nbsp点击刷新<i class="icon-shuaxin"></i>
                  </div>
                </template>
              </app-list>
            </app-scroll>
          </template>
          <template v-else>{{item.text}}</template>
        </yd-slider-item>
      </yd-slider>-->
      <!--左右滑动，并且与头部nav联动-->
      <app-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval"
                 :threshold="threshold" :speed="speed"
                 v-model="active">
        <div v-for="(item,index) in navList" :key="index">
          <!--推荐部分-->
          <div v-if="item.text === '推荐'" class="record">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollRecord"
                        @pullingUp="scrollUP('record')"
                        @pullingDown="scrollDN('record')">
              <app-list v-for="(item,index) in recordList" :key="index" :theme="item.theme">
                <template v-if="item.id">
                  <template slot="title">{{item.title}}<span class="delete" v-if="item.titleDelete"><i
                    class="icon-guanbi"></i></span></template>
                  <template slot="imgs" v-if="item.imgs">
                    <div class="img-wrapper" v-for="(img ,index) in item.imgs" :key="index">
                      <img :src="img.src" alt="">
                    </div>
                  </template>
                  <template slot="img" v-if="item.img">
                    <img :src="item.img" alt="">
                  </template>
                  <template slot="advertising" v-if="item.advertising">
                    <div class="advertising-top_avatar">
                      <div class="img-mask">
                        <div class="mask"></div>
                        <img :src="item.advertising.bgImg" alt="">
                      </div>
                      <div class="information">
                        <a href="javascript: void(0)" class="replay"><i class="icon-guanbi"></i>重播</a>
                        <div class="center">
                          <img :src="item.advertising.avata" alt="">
                          <span class="txt">{{item.advertising.txt}}</span>
                          <yd-button bgcolor="#fff" color="#197ADE" @click.native="goDownLoad">立即下载</yd-button>
                        </div>
                      </div>
                    </div>
                    <div class="advertising-bottom_download">
                      <span class="txt">体验3分钟</span>
                      <a href="javascript: void(0)">立即下载</a>
                    </div>
                  </template>
                  <template slot="subtitle" v-if="item.subtitle">
                    <span class="top" v-if="item.subtitle&&item.subtitle.top">置顶</span>
                    <span class="hot" v-if="item.subtitle&&item.subtitle.hot">热</span>
                    <span class="ad" v-if="item.subtitle&&item.subtitle.ad">广告</span>
                    <span class="name" v-if="item.subtitle&&item.subtitle.name">{{item.subtitle.name}}</span>
                    <span class="comment" v-if="item.subtitle&&item.subtitle.comment">{{item.subtitle.comment}}评论</span>
                    <span class="time" v-if="item.subtitle&&item.subtitle.time">{{item.subtitle.time}}</span>
                    <span class="delete" v-if="item.delete"><i class="icon-guanbi"></i></span>
                  </template>
                  <template slot="carAdvertising" v-if="item.carAdvertising">
                    <div v-for="(car, index) in item.carAdvertising" :key="index" class="car-item">
                      <div class="flex_left">
                        <div class="img-wrapper">
                          <img :src="car.src" alt="">
                        </div>
                        <div class="detail">
                          <div class="name">{{car.name}} <span v-if="car.hot">热门</span></div>
                          <div class="subscription">{{car.subscription}}</div>
                        </div>
                      </div>
                      <yd-button bgcolor="#ed4040" color="#FFF">{{car.btnTxt}}</yd-button>
                    </div>
                  </template>
                  <template slot="bottom" v-if="item.bottomTxt">
                    <span class="txt">查看全部 <i class="icon-guanbi"></i></span>
                  </template>
                  <template slot="top" v-if="item.top">
                    <div class="top_left">
                      <div class="img-wrapper">
                        <img :src="item.top.avata" alt="">
                      </div>
                      <div class="title">
                        <span class="name">{{item.top.name}}</span>
                        <span class="dedescription">{{item.top.description}}</span>
                      </div>
                    </div>
                    <div class="top_right">
                      <a href="javascript: void(0)">关注</a>
                      <span class="delete"><i class="icon-guanbi"></i></span>
                    </div>
                  </template>
                  <template slot="body" v-if="item.body">
                    <div class="content">{{item.body.content}}</div>
                    <div class="img-wrapper">
                      <img :src="img.src" alt="" v-for="(img,index) in item.body.imgs" :key="index" class="img-item">
                    </div>
                  </template>
                  <template slot="footer" v-if="item.footer">
                    <span class="forward"><i class="icon-zhuanfa"></i>{{item.footer.forward}}</span>
                    <span class="comment"><i class="icon-62"></i>{{item.footer.comment}}</span>
                    <span class="like"><i class="icon-dianzan"></i>{{item.footer.like}}</span>
                  </template>
                  <template slot="bodySpecial" v-if="item.bodySpecial">
                    <div class="bodySpecial_left">
                      <span class="txt">{{item.bodySpecial.leftContent}}</span>
                      <span class="comment">{{item.bodySpecial.comment}}评论</span>
                    </div>
                    <div class="bodySpecial_right">
                      <img :src="item.bodySpecial.rightBgImg" alt="">
                    </div>
                  </template>
                </template>
                <template v-else>
                  <!--提示-->
                  <div class="prompt" slot="other">
                    <span class="time">{{item.time}}</span>前看到这里&nbsp&nbsp&nbsp&nbsp点击刷新<i class="icon-shuaxin"></i>
                  </div>
                </template>
              </app-list>
            </app-scroll>
          </div>
          <!--直播部分-->
          <div v-if="item.text === '直播'" class="LiveBroadcast">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollLiveBroadcast"
                        @pullingUp="scrollUP('LiveBroadcast')"
                        @pullingDown="scrollDN('LiveBroadcast')">
              <app-list v-for="(item,index) in LiveBroadcast" :key="index" :theme="item.theme">
                <template v-if="item.id">
                  <template slot="top" v-if="item.top">
                    <div class="top_left">
                      <div class="img-wrapper">
                        <img :src="item.top.avata" alt="">
                      </div>
                      <div class="title">
                        <span class="name">{{item.top.name}}</span>
                        <span class="fan">{{item.top.fan}}粉丝 <span class="description" v-if="item.top.description">{{item.top.description}}</span></span>
                      </div>
                    </div>
                    <div class="top_right">
                      <span class="delete"><i class="icon-guanbi"></i></span>
                    </div>
                  </template>
                  <template slot="title" v-if="item.title">{{item.title}}</template>
                  <template slot="body" v-if="item.body">
                    <div class="img-wrapper">
                      <img :src="item.body.img" alt="">
                      <span class="LiveBroadcasting"><i class="forward"></i>直播中</span>
                      <span class="popularity">{{item.body.Popularity}}人气</span>
                      <span class="icon"></span>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <!--提示-->
                  <div class="prompt" slot="other">
                    <span class="time">{{item.time}}</span>前看到这里&nbsp&nbsp&nbsp&nbsp点击刷新<i class="icon-shuaxin"></i>
                  </div>
                </template>
              </app-list>
            </app-scroll>
          </div>
          <!--视频部分-->
          <div v-if="item.text === '视频'" class="video">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scroll"
                        @pullingUp="scrollUP('video')"
                        @pullingDown="scrollDN('video')">
              <app-list v-for="(item,index) in bodyList" :key="index" :theme="item.theme">
                <template v-if="item.id">
                  <!--<img :src="item.img" alt="" slot="img">-->
                  <div class="video" style="width: 100%;height: 4rem" slot="img">
                    <video-player  class="vjs-custom-skin"
                                   :ref="item.videoPlayerOptions.ref"
                                   :options="item.videoPlayerOptions"
                                   :playsinline="true"
                                   @play="onPlayerPlay($event,item)"
                                   @pause="onPlayerPause($event,item)"
                    >
                    </video-player>
                  </div>
                  <span slot="title" v-if="!item.videoShow">{{item.title}}</span>
                  <span slot="bofang" v-if="!item.videoShow">{{item.bofang}}次播放</span>
                  <span slot="time" v-if="!item.videoShow">{{item.time|formatTime}}</span>
                  <div slot="other" class="list-bottom">
                    <div class="list-bottom_left">
                      <span class="avata">
                        <img :src="item.avata" alt="">
                      </span>
                      <span class="name">{{item.name}}</span>
                      <span class="attention">{{item.attention|filterComment}}</span>
                    </div>
                    <div class="list-bottom_right">
                      <span class="comment"><i class="icon-62"></i>{{item.comment}}</span>
                      <span class="operating">
                        <i class="icon-more" @click="clickOperating"></i>
                     </span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <!--提示-->
                  <div class="prompt" slot="other">
                    <span class="time">{{item.time}}</span>前看到这里&nbsp&nbsp&nbsp&nbsp点击刷新<i class="icon-shuaxin"></i>
                  </div>
                </template>
              </app-list>
            </app-scroll>
          </div>
          <div v-else>{{item.text}}</div>
        </div>
      </app-slide>
    </div>
    <!--点击列表更多，出现底部弹出框，可以分享，点赞啥的。。。-->
    <div class="popupShow-wrapper">
      <yd-popup v-model="popupShow" position="bottom" maskerOpacity="0.2">
        <div class="popup-content">
          <div class="popup-content_top">
            <app-scroll-tab :navList="popupListUP" v-model="active" font-size="0.24rem"
                            activeColor="#585858" ref="scrollTabPopupTop" icon></app-scroll-tab>
          </div>
          <div class="popup-content_bottom">
            <app-scroll-tab :navList="popupListDown" v-model="active" font-size="0.24rem"
                            activeColor="#585858" ref="scrollTabPopupDown" icon></app-scroll-tab>
          </div>
        </div>
        <a class="cancel" @click="cancel" href="javascript: void(0)">取消</a>
      </yd-popup>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'app-head-search': require('../../src/components/head-search.vue').default,
      'app-scroll-tab': require('../../src/components/scrollTab/scroll-tab.vue').default,
      'app-scroll': require('../components/scroll/scroll.vue').default,
      'app-list': require('../components/list/list.vue').default,
      'app-slide': require('../components/slider/slide.vue').default
    },
    data() {
      return {
        playerOptions: {
          autoplay: false,
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: 'http://vjs.zencdn.net/v/oceans.mp4'
          }],
          poster: require('../assets/image/700x400.png')
        },
        num: 20,
        typeChannel: false,
        active: 3,
        navList: [
          {
            text: '关注',
            dot: true
          },
          {
            text: '推荐'
          },
          {
            text: '直播'
          },
          {
            text: '视频'
          },
          {
            text: '热点'
          },
          {
            text: '上海'
          },
          {
            text: '图片'
          },
          {
            text: '娱乐'
          },
          {
            text: '问答'
          },
          {
            text: '科技'
          },
          {
            text: '懂车帝'
          },
          {
            text: '财经'
          },
          {
            text: '军事'
          },
          {
            text: '体育'
          },
          {
            text: '国际'
          },
          {
            text: '健康'
          },
          {
            text: '房产'
          },
          {
            text: '新时代'
          },
          {
            text: '国风'
          },
          {
            text: '值点'
          },
          {
            text: 'NBA'
          }
        ],
        myChannelList: [],
        recommendList: [
          {
            text: '党媒推荐',
            isLong: true
          },
          {
            text: '动物'
          },
          {
            text: '音乐'
          },
          {
            text: '电影'
          },
          {
            text: '科学'
          },
          {
            text: '股票'
          },
          {
            text: '教育'
          },
          {
            text: '家具'
          },
          {
            text: '宠物'
          },
          {
            text: '文化'
          },
          {
            text: '游戏'
          },
          {
            text: '手机'
          },
          {
            text: '钓鱼'
          },
          {
            text: '旅游'
          },
          {
            text: '时尚'
          },
          {
            text: '三农'
          },
          {
            text: '数码'
          },
          {
            text: '影视'
          }
        ],
        btnChannel: true,
        typeScroll: 'UP',
        //上拉刷新滚动加载所需参数
        scroll: 0,
        scrollRecord: 0,
        scrollLiveBroadcast: 0,
        numScroll: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
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
        //视频部分数据
        bodyList: [
          {
            id: 1,
            theme: 1,
            videoShow: false,
            title: '有哪些你该懂却不懂的人际交往小常识',
            // img: 'https://via.placeholder.com/700x400?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '1',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '3',
            // avata: 'https://via.placeholder.com/40x40/3eede7?text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '土豆妹小明',
            attention: 0,
            comment: 604,
            popupShow: false
          },
          {
            id: 2,
            theme: 1,
            videoShow: false,
            title: '女儿出国回来，亲爹这表现，醋意太明显！哈哈',
            // img: 'https://via.placeholder.com/700x400/177cb0?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '2',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '176',
            // avata: 'https://via.placeholder.com/40x40/177cb0?text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '林间白汇',
            attention: 0,
            comment: 197
          },
          {
            id: 3,
            theme: 1,
            videoShow: false,
            title: '人类首张黑洞照片到底打开了多少和脑洞？',
            // img: 'https://via.placeholder.com/700x400/edd1d8?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '3',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '1176',
            // avata: 'https://via.placeholder.com/40x40/edd1d8?text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '知乎',
            attention: 0,
            comment: 604
          },
          {
            id: 4,
            theme: 1,
            videoShow: false,
            title: '我是憋不住笑了,难道这就是独生子女的好处？',
            // img: 'https://via.placeholder.com/700x400/f3f9f1?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '4',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '176',
            // avata: 'https://via.placeholder.com/40x40/f3f9f1?text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '寻找奇异之旅',
            attention: 0,
            comment: 595
          },
          {
            id: 5,
            theme: 1,
            videoShow: false,
            title: '本来以为就是画个老虎，没想到惊喜全在后面啊',
            // img: 'https://via.placeholder.com/700x400/bddd22?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '5',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '176',
            // avata: 'https://via.placeholder.com/40x40/bddd22text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '七千电影',
            attention: 0,
            comment: 33
          },
          {
            id: 6,
            theme: 1,
            videoShow: false,
            title: '复联4 我灭霸也室友粉丝的人',
            // img: 'https://via.placeholder.com/700x400/ff4777?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '6',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '1776',
            // avata: 'https://via.placeholder.com/40x40/ff4777text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '油脂的小孩',
            attention: 0,
            comment: 16
          },
          {
            id: 7,
            theme: 1,
            videoShow: false,
            title: '万万没想到这是王大锤配的音',
            // img: 'https://via.placeholder.com/700x400/177cb0?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '7',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '5776',
            // avata: 'https://via.placeholder.com/40x40/177cb0text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '志则、',
            attention: 0,
            comment: 116
          },
          {
            id: 8,
            theme: 1,
            videoShow: false,
            title: '人类首张黑洞照片到底打开了多少和脑洞？',
            // img: 'https://via.placeholder.com/700x400/edd1d8?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '8',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '1176',
            // avata: 'https://via.placeholder.com/40x40/edd1d8?text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '知乎',
            attention: 0,
            comment: 604
          },
          {
            id: 9,
            theme: 1,
            videoShow: false,
            title: '我是憋不住笑了,难道这就是独生子女的好处？',
            // img: 'https://via.placeholder.com/700x400/f3f9f1?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '9',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '176',
            // avata: 'https://via.placeholder.com/40x40/f3f9f1?text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '寻找奇异之旅',
            attention: 0,
            comment: 595
          },
          {
            id: 10,
            theme: 1,
            videoShow: false,
            title: '本来以为就是画个老虎，没想到惊喜全在后面啊',
            // img: 'https://via.placeholder.com/700x400/bddd22?text=video',
            img: require('../assets/image/700x400.png'),
            videoPlayerOptions: {
              ref: '10',
              autoplay: false,
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: 'video/mp4',
                src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: require('../assets/image/700x400.png'),
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: false
              }
            },
            bofang: 919,
            time: '176',
            // avata: 'https://via.placeholder.com/40x40/bddd22text=avata',
            avata: require('../assets/image/f3f9f1.png'),
            name: '七千电影',
            attention: 0,
            comment: 33
          }
        ],
        //推荐部分数据
        recordList: [
          {
            id: 1,
            theme: 2,
            title: '习近平在全国工作会议上的讲话',
            subtitle: {
              top: true,
              name: '央视新闻网',
              comment: 495,
              time: '刚刚'
            }
          },
          {
            id: 2,
            theme: 2,
            title: '文明交流何以重要？习近平讲话引人深思',
            subtitle: {
              top: true,
              name: '求是网',
              comment: 158,
              time: '9分钟前'
            }
          },
          {
            id: 3,
            theme: 2,
            title: '一香港演员硬盘被窃：要了我的命 请换回来',
            subtitle: {
              hot: true,
              name: '新闻晨报',
              comment: 2100,
              time: '17分钟前'
            },
            imgs: [
              { src: require('../assets/image/200x100.png') },
              { src: require('../assets/image/200x100.png') },
              { src: require('../assets/image/200x100.png') }
            ],
            delete: true
          },
          {
            id: 4,
            theme: 2,
            title: '上线送神兽，上线送神兽，无级别任爆，无级别任爆！',
            subtitle: {
              name: '星辰奇缘:爆无级别',
              ad: true,
              time: '1小时前'
            },
            advertising: {
              txt: '星辰奇缘:爆无级别',
              avata: require('../assets/image/80x80.png'),
              // avata: 'https://via.placeholder.com/40x40?text=avata',
              bgImg: require('../assets/image/700x400.png')
              // bgImg: 'https://via.placeholder.com/700x400?text=bgImg'
            }
          },
          {
            id: 5,
            theme: 2,
            title: '霸王的大陆，打骂我都能抗住，就怕关机丢记录',
            // img: 'https://via.placeholder.com/200x100?text=bgImg',
            img: require('../assets/image/200x100.png'),
            subtitle: {
              name: '82电玩大叔',
              comment: 32,
              time: ''
            },
            delete: true
          },
          {
            id: 6,
            theme: 2,
            title: '将13个孩子全部培养成博士，李昌钰的母亲总结出15字教子经',
            subtitle: {
              hot: true,
              name: '校长传媒',
              comment: 1077,
              time: '15分钟前'
            },
            imgs: [
              { src: require('../assets/image/200x100.png') }
            ],
            delete: true
          },
          {
            id: 7,
            theme: 3,
            title: '推荐车型',
            titleDelete: true,
            carAdvertising: [
              {
                src: require('../assets/image/200x100.png'),
                name: '五菱宏光',
                subscription: '最低报价优惠23.36%',
                hot: true,
                btnTxt: '去询价'
              },
              {
                src: require('../assets/image/200x100.png'),
                name: 'Urus',
                subscription: '290.00万起',
                btnTxt: '去询价'
              },
              {
                src: require('../assets/image/200x100.png'),
                name: '奥迪R8',
                subscription: '最低报价优惠28.31%',
                btnTxt: '去询价'
              }
            ],
            bottomTxt: true
          },
          {
            id: 8,
            theme: 2,
            title: '那些不爱惜自己身体的女孩，后来都怎么样了？',
            subtitle: {
              hot: true,
              name: '六层楼医生',
              comment: 561,
              time: '1小时前'
            },
            imgs: [
              { src: require('../assets/image/200x100.png') },
              { src: require('../assets/image/200x100.png') },
              { src: require('../assets/image/200x100.png') }
            ],
            delete: true
          },
          {
            id: 9,
            theme: 4,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '小奇趣摘',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              content: '明天就要出院了怎么办！好难过！请大家支招，有没有什么办法多住一段时间',
              imgs: [
                { src: require('../assets/image/200x100.png') },
                { src: require('../assets/image/200x100.png') }
              ]
            },
            footer: {
              forward: 21,
              comment: 688,
              like: 1821
            }
          },
          {
            id: 10,
            theme: 4,
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '小鹿情感先生',
              avata: require('../assets/image/80x80.png'),
              description: '优质情感领域创作者'
            },
            bodySpecial: {
              leftContent: '50个拉升你和妹子关系的约会项目',
              comment: 15,
              // rightBgImg: 'https://via.placeholder.com/200x100?text=img'
              rightBgImg: require('../assets/image/200x100.png')
            }
          }
        ],
        //直播部分数据
        LiveBroadcast: [
          {
            id: 1,
            theme: 5,
            title: '要想多钓鱼，早起来打窝',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              avata: require('../assets/image/80x80.png'),
              name: '嘉铭海鲜户外美食',
              fan: 2172
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 2,
            theme: 5,
            title: '血流成河-挑战上亿',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: 'Cen、磊哥',
              avata: require('../assets/image/80x80.png'),
              fan: 8007,
              description: '网吧负责人'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '4955'
            }
          },
          {
            id: 3,
            theme: 5,
            title: '可能我撞了南墙才回头吧',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '你de昭君',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 4,
            theme: 5,
            title: '英雄联盟：峡谷中最亮的carry',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '怪蜀黍嘿咪',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 5,
            theme: 5,
            title: '荒野大嫖客2： 线上对决，今天抢歪果仁',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '不良对长',
              avata: require('../assets/image/80x80.png'),
              description: '游戏领域创作者'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '1520'
            }
          },
          {
            id: 6,
            theme: 5,
            title: '吞食天地孔明转',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '奔跑的投石车',
              avata: require('../assets/image/80x80.png'),
              description: '游戏领域创作者'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 7,
            theme: 5,
            title: '要想多钓鱼，早起来打窝',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '小奇趣摘',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 8,
            theme: 5,
            title: '要想多钓鱼，早起来打窝',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '小奇趣摘',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 9,
            theme: 5,
            title: '要想多钓鱼，早起来打窝',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '小奇趣摘',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          },
          {
            id: 10,
            theme: 5,
            title: '要想多钓鱼，早起来打窝',
            top: {
              // avata: 'https://via.placeholder.com/80x80?text=img',
              name: '小奇趣摘',
              avata: require('../assets/image/80x80.png'),
              description: '知名搞笑自媒体'
            },
            body: {
              // img: 'https://via.placeholder.com/700x400?text=img',
              img: require('../assets/image/700x400.png'),
              Popularity: '766'
            }
          }
        ],
        popupShow: false,
        //底部弹出层
        popupListUP: [
          {
            icon: 'icon-tuwen',
            text: '转发到头条'
          },
          {
            icon: 'icon-tuwen',
            text: '微信'
          },
          {
            icon: 'icon-tuwen',
            text: '朋友圈'
          },
          {
            icon: 'icon-tuwen',
            text: '钉钉'
          },
          {
            icon: 'icon-tuwen',
            text: 'QQ'
          },
          {
            icon: 'icon-tuwen',
            text: 'QQ空间'
          },
          {
            icon: 'icon-tuwen',
            text: '系统分享'
          },
          {
            icon: 'icon-tuwen',
            text: '复制链接'
          }
        ],
        popupListDown: [
          {
            icon: 'icon-tuwen',
            text: '帮上头条'
          },
          {
            icon: 'icon-tuwen',
            text: '收藏'
          },
          {
            icon: 'icon-tuwen',
            text: '不感兴趣'
          },
          {
            icon: 'icon-tuwen',
            text: '顶'
          },
          {
            icon: 'icon-tuwen',
            text: '踩'
          },
          {
            icon: 'icon-tuwen',
            text: '举报'
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
    computed: {
      btnChange() {
        return this.btnChannel === true ? '编辑' : '完成'
      },
      chanelTxt() {
        return this.btnChannel === true ? '点击进入频道' : '拖拽可进行排序'
      }
    },
    methods: {
      onPlayerPlay(player, item) {
        console.log(item)
        this.$set(item, 'videoShow', true)
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      //推荐广告下载
      goDownLoad() {
        this.$dialog.toast(
          {
            mes: '下载成功',
            timeout: 1500,
            icon: 'success'
          }
        )
      },
      //左右滑动改变
      activeChange(val) {
        // console.log(val, this.active)
        this.active = val
      },
      //底部弹出框关闭
      cancel() {
        this.popupShow = false
      },
      //打开底部弹出框
      clickOperating() {
        this.popupShow = true
      },
      //nav导航栏，点击
      itemClick(val) {
        // console.log(val)
      },
      //我的频道，切换
      btnClk() {
        this.btnChannel = !this.btnChannel
      },
      //更新数据
      async getPostList(type) {
        let self = this
        let num = Math.random() * 10
        let _list = []
        let count = parseInt(num)
        switch (type) {
          case 'video':
            while (count--) {
              _list.push(this.bodyList[count])
            }
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.bodyList = [...self.bodyList, { theme: 1, time: 45 }, ..._list]
                self.scroll < 0 ? self.scroll = 1 : self.scroll++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scroll === 0 ? self.scroll-- : self.scroll = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scroll <= 0 ? self.scroll-- : self.scroll++
                self.bodyList = [..._list, { theme: 1, time: 45 }, ...self.bodyList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scroll <= 0 ? self.scroll-- : self.scroll++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
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
          case 'LiveBroadcast':
            while (count-- && count-- > 1) {
              _list.push(this.LiveBroadcast[count])
            }
            console.log(_list, num)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.LiveBroadcast = [...self.LiveBroadcast, { theme: 1, time: 45 }, ..._list]
                self.scrollLiveBroadcast < 0 ? self.scrollLiveBroadcast = 1 : self.scrollLiveBroadcast++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollLiveBroadcast === 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollLiveBroadcast <= 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast++
                self.LiveBroadcast = [..._list, { theme: 1, time: 45 }, ...self.LiveBroadcast]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollLiveBroadcast <= 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast++
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
          case 'video':
            this.getPostList(type)
            break
          case 'record':
            this.getPostList(type)
            break
          case 'LiveBroadcast':
            this.getPostList(type)
            break
        }
      },
      //下拉刷新
      scrollDN(type) {
        this.typeScroll = 'DN'
        switch (type) {
          case 'video':
            this.getPostList(type)
            break
          case 'record':
            this.getPostList(type)
            break
          case 'LiveBroadcast':
            this.getPostList(type)
            break
        }
      },
      //频道删除
      channelDelete(item, index) {
        this.navList.splice(index, 1)
        this.recommendList.unshift(item)
      },
      //增加频道
      addChannel(item, index) {
        this.navList.push(item)
        this.recommendList.splice(index, 1)
      }
    },
    created() {
      this.$nextTick(() => {
      })
    },
    filters: {
      filterComment(val) {
        return val === 0 ? '关注' : '取消关注'
      },
      formatTime(val) {
        let secondTime = parseInt(val)// 秒
        let minuteTime = 0// 分
        let hourTime = 0// 小时
        if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
          //获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60)
          //获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60)
          //如果分钟大于60，将分钟转换成小时
          if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60)
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60)
          }
        }
        let result = ''
        if (secondTime >= 10) {
          result = '' + parseInt(secondTime)
        } else {
          result = '0' + parseInt(secondTime)
        }
        if (minuteTime && minuteTime > 0) {
          minuteTime >= 10 ? result = '' + parseInt(minuteTime) + ':' + result : result = '0' + parseInt(minuteTime) + ':' + result
        } else {
          result = '00' + ':' + result
        }
        if (hourTime && hourTime > 0) {
          hourTime >= 10 ? result = '' + parseInt(hourTime) + ':' + result : result = '0' + parseInt(hourTime) + ':' + result
        }
        return result
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/styl/mixin.styl"
  #app-index
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
    width: 100%
    position: absolute
    top: 0
    bottom: 0.91rem
    /deep/ .scroll-box
      -font-weight: 500
    .type
      position: absolute
      top: 1.1rem
      right: 0rem
      padding: 0.08rem 0.1rem
      padding-right: 0.22rem
      background-color: rgba(255, 255, 255, 0.9)
    //box-shadow: -2px 0px 0px rgba(0,0,0,0.8);
    .type-popup
      .top
        //margin: 0 0.12rem
        padding: 0.16rem 0.18rem
        border-1px(#e5e5e5)
        > i
          padding: 0.04rem
      .scroll-no_scroll
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        .my-channel_head
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0.12rem 0.18rem 0
          .channel_head
            font-size: 0.30rem
            > span
              font-size: 0.24rem
              transform: scale(0.8)
              color: #666
          /deep/ .yd-btn-primary
            font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
            font-size: 0.24rem
            padding: 0 0.24rem
            background-color: #fff
            border: 1px solid #ed4040
            border-radius: 10px
        .my-channel_list
          overflow: hidden
          padding: 0 0.18rem
          .my-channel_item
            float: left
            height: 0.7rem
            width: 22%
            display: flex
            justify-content: center
            align-items: center
            margin-right: 4%
            margin-top: 4%
            background-color: rgba(224, 225, 225, 0.8)
            border-radius: 4px
            position: relative
            .icon-delete
              color: #9b9b9b
              position: absolute
              right: -0.12rem
              top: -0.14rem
            &:nth-child(4n)
              margin-right: 0
            &:nth-child(1)
              color: #9b9b9b
            &:nth-child(2)
              color: #9b9b9b
        .recommend_head
          margin-top: 0.8rem
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0.12rem 0.18rem 0
          .channel_head
            font-size: 0.30rem
            > span
              font-size: 0.24rem
              transform: scale(0.8)
              color: #666
        .recommend_list
          overflow: hidden
          padding: 0 0.18rem 1.2rem
          .recommend_item
            float: left
            height: 0.7rem
            width: 22%
            display: flex
            justify-content: center
            align-items: center
            margin-right: 4%
            margin-top: 4%
            background-color: rgba(224, 225, 225, 0.8)
            border-radius: 4px
            .icon-jiahao
              font-size: 0.36rem
            &:nth-child(4n)
              margin-right: 0
            &.is-long
              font-size: 12px
              .icon-jiahao
                font-size: 0.30rem
    .body
      height: calc(100% - 1.8rem)
      overflow: hidden
      .slide
        height: 100%
        /deep/ .slide-group
          height: 100%
          .slide-item
            height: 100%
            > div
              height: 100%
      .yd-slider
        height: 100%
      .list-bottom
        height: 0.9rem
        display: flex
        align-items: center
        justify-content: space-between
        padding: 0 0.2rem
        background-color: #fff
        .list-bottom_left
          display: flex
          align-items: center
          .avata
            display: inline-block
            width: 0.6rem
            padding: 0.3rem 0
            height: 0
            overflow: hidden
            border-radius: 50%
            > img
              display: block
              width: 100%
              background-color: #FFF
              border: none
              margin-top: -50%
          .name
            display: inline-block
            padding: 0 0.1rem
            position: relative
            color: #080808
            font-weight: 600
            &:after
              content: ''
              position: absolute
              top: 0
              right: 0
              width: 1px
              height: 100%
              background-image: linear-gradient(to right, #ccc 50%, transparent 50%)
          .attention
            color: #ed4040
            display: inline-block
            padding: 0 0.1rem
        .list-bottom_right
          display: flex
          .comment
            margin-right: 0.2rem
            position: relative
            top: -0.04rem
            .icon-62
              margin-right: 0.1rem
              font-size: 0.4rem
      .prompt
        background-color: #E3E3E3
        justify-content: center
        color: #117EEE
        padding: 0.2rem 0
        display: flex
        align-items: center
        .icon-shuaxin
          font-size: 0.30rem
    .popupShow-wrapper
      /deep/ .yd-popup-show
        background-color: transparent
        padding-bottom: 0.2rem
        .popup-content, .cancel
          background-color: #fff
          width: 95%
          margin: 0 auto
          border-radius: 4px
        .popup-content
          .popup-content_top
            padding: 0.5rem 0.2rem
            border-1px(#e5e5e5)
            .scroll-box
              border-none()
          .popup-content_bottom
            padding: 0.5rem 0.2rem
            .scroll-box
              border-none()
        .cancel
          display: block
          margin-top: 0.2rem
          text-align: center
          font-size: 0.30rem
          padding: 0.3rem 0
</style>
