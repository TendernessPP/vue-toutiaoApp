<template>
  <div class="demo">
      <!--<video-player  class="vjs-custom-skin"-->
                     <!--ref="videoPlayer"-->
                     <!--:options="playerOptions"-->
                     <!--:playsinline="true"-->
                     <!--@play="onPlayerPlay($event)"-->
                     <!--@pause="onPlayerPause($event)"-->
                    <!--&gt;-->
      <!--</video-player>-->
    <video-player  class="vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
                     @loadeddata="onPlayerLoadeddata($event)"
                     @waiting="onPlayerWaiting($event)"
                     @playing="onPlayerPlaying($event)"
                     @timeupdate="onPlayerTimeupdate($event)"
                     @canplay="onPlayerCanplay($event)"
                     @canplaythrough="onPlayerCanplaythrough($event)"
                     @ready="playerReadied"
                     @statechanged="playerStateChanged($event)">
      </video-player>
  </div>
</template>

<script>
  export default {
    components: {},
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
          poster: require('../assets/image/700x400.png'),
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: false
          }
        }
      }
    },
    mounted() {
      // setTimeout(() => {
      //   console.log('dynamic change options', this.player)
      //   this.player.muted(false)
      // }, 5000)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      onPlayerPlay(player) {
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        console.log('example player 1 readied', player)
        // player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .demo
    position: absolute
    bottom: 0.94rem
    top: 0
    width: 100%
    overflow: hidden
    .vjs-custom-skin
      width: 100%
      height: 200px
      /deep/ .video-js
        width: 100%
        height: 100%
        .vjs-tech
          width: 100%
          height: 100%
          display: block
          object-fit: fill
        .vjs-poster
          background-size: 100% 100%
        .vjs-big-play-button
          width: 0.8rem
          height: 0.8rem
          line-height: 0.8rem
          border-radius: 50%
          top: 50%
          left: 50%
          transform: translate(-50%,-50%)
</style>
