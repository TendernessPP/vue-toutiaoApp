<template>
  <div class="demo">
    <app-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval" :threshold="threshold" :speed="speed"
               v-model="activeIndex">
      <div v-for="(item,index) in data" :key="index">
        <a :href="item.linkUrl">
          <img :src="item.picUrl">
        </a>
      </div>
    </app-slide>
    <!--<app-scroll>-->
      <!--<div v-for="(item,index) in num " :key="index" style="height: 4rem">{{item}}</div>-->
    <!--</app-scroll>-->
  </div>
</template>

<script>
  const items = [
    [
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
        id: 11351
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
        id: 11372
      }
    ],
    [
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
        id: 11378
      },
      {
        linkUrl: 'https://y.qq.com/msa/218/0_4085.html',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg',
        id: 11375
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg',
        id: 11287
      }
    ]
  ]
  export default {
    components: {
      'app-scroll': require('../components/scroll/scroll.vue').default,
      'app-slide': require('../components/slider/slide.vue').default
    },
    computed: {
      data() {
        return items[this.index]
      }
    },
    data() {
      return {
        num: 5,
        index: 1,
        activeIndex: 0,
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
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .demo
    position: absolute
    bottom: 0.94rem
    top: 0
    width: 100%
    overflow: hidden
    /*.slide
      height: 100%
      /deep/ .slide-group
          height: 100%
          .slide-item
            height: 100%*/
</style>
