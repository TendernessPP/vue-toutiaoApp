<template>
  <article class="app-list" :class="classes">
    <div class="app-list-item" v-if="theme ===1">
      <div class="app-list-img" v-if="!!$slots.img">
        <slot name="img"></slot>
        <span class="icon"></span>
        <span class="bofang">
          <slot name="bofang"></slot>
        </span>
        <span class="time">
          <slot name="time"></slot>
        </span>
      </div>
      <div class="app-list-title" v-if="!!$slots.title">
        <slot name="title"></slot>
      </div>
      <slot name="other" v-if="!!$slots.other"></slot>
    </div>
    <div class="app-list-item" v-if="theme ===2" :class="!!$slots.img?'left_right':''">
      <template v-if="!!$slots.img">
        <div class="left">
          <div class="app-list-title" v-if="!!$slots.title">
            <slot name="title"></slot>
          </div>
          <div class="app-list-subtitle" v-if="!!$slots.subtitle">
            <slot name="subtitle"></slot>
          </div>
        </div>
        <div class="app-list-img" v-if="!!$slots.img">
          <slot name="img"></slot>
        </div>
      </template>
      <template v-else>
        <div class="app-list-title" v-if="!!$slots.title">
          <slot name="title"></slot>
        </div>
        <div class="app-list-imgs" v-if="!!$slots.imgs">
          <slot name="imgs"></slot>
        </div>
        <div class="app-list-advertising" v-if="!!$slots.advertising" >
          <slot name="advertising"></slot>
        </div>
        <div class="app-list-subtitle" v-if="!!$slots.subtitle">
          <slot name="subtitle"></slot>
        </div>
      </template>
    </div>
    <div class="app-list-item" v-if="theme ===3">
        <div class="app-list-title" v-if="!!$slots.title">
          <slot name="title"></slot>
        </div>
        <div class="app-list-carAdvertising" v-if="!!$slots.carAdvertising">
          <slot name="carAdvertising"></slot>
        </div>
        <div class="app-list-bottom" v-if="!!$slots.bottom">
          <slot name="bottom"></slot>
        </div>
    </div>
    <div class="app-list-item" v-if="theme ===4">
      <div class="app-list-top" v-if="!!$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="app-list-body" v-if="!!$slots.body">
        <slot name="body"></slot>
      </div>
      <div class="app-list-bodySpecial" v-if="!!$slots.bodySpecial">
        <slot name="bodySpecial"></slot>
      </div>
      <div class="app-list-footer" v-if="!!$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="app-list-item" v-if="theme ===5">
      <div class="app-list-top" v-if="!!$slots.top">
        <slot name="top"></slot>
      </div>
      <div class="app-list-title" v-if="!!$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="app-list-body" v-if="!!$slots.body">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="app-list-item" v-if="theme ===6">
      <div class="app-list-title" v-if="!!$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="app-list-body" v-if="!!$slots.body">
        <slot name="body"></slot>
      </div>
      <div class="app-list-footer" v-if="!!$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      theme: {
        validator(value) {
          return ['1', '2', '3', '4', '5', '6'].indexOf(value + '') > -1
        },
        default: '1'
      }
    },
    data() {
      return {}
    },
    computed: {
      classes() {
        return 'app-list-theme' + this.theme
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/styl/mixin.styl"
  .app-list
    position: relative
    overflow: hidden
    .app-list-img
      //height: 0
      width: 100%
      //padding: 50% 0
      overflow: hidden
      img
        width: 100%
        //margin-top: -50%
        background-color: rgba(255, 255, 255, 0.9)
        border: none
        display: block
    .app-list-mes
        background-color: #FFF
        .app-list-title
          color: #505050
          font-size: .26rem
          text-align: justify
          font-weight: 800
    &.app-list-theme1
      &:not(:last-child)
        margin-bottom: 0.16rem
      .app-list-title
          position: absolute
          top: 0.1rem
          left: 0
          width: 100%
          color: #F2F3F4
          padding: 0.1rem 0.4rem 0 0.2rem
          font-size: 0.3rem
          text-align: left
      .app-list-img
          position: relative
          .icon
            width: 0.8rem
            height: 0.8rem
            position: absolute
            top: 50%
            left: 50%
            border-radius: 50%
            transform:  translate(-50%,-50%)
            background-color: rgba(0,0,0,.5)
            &:after
                content:"";
                width: 0
                height: 0
                position: absolute
                top: 50%
                left: 68%
                transform: translate(-50%,-50%)
                border-left: 0.2rem solid #fff
                border-right: 0.2rem solid transparent
                border-top: 0.2rem solid transparent
                border-bottom: 0.2rem solid transparent
          .bofang
            position: absolute
            bottom: 0.2rem
            left: 0.2rem
            color: #F2F3F4
            font-size: 0.24rem
          .time
            color: #F2F3F4
            font-size: 0.24rem
            position: absolute
            right: 0.2rem
            bottom: 0.2rem
            border-radius: 10px
            background-color: rgba(0,0,0,.2)
            padding: 0.06rem 0.2rem
    &.app-list-theme2
      background-color: #fff
      .app-list-item
        position: relative
        margin: 0 0.2rem
        border-1px(#e5e5e5)
        .app-list-title
          padding: 0.3rem 0 0.2rem
          text-align: left
          font-size: 0.30rem
        .app-list-imgs
          overflow: hidden
          display: flex
          margin-bottom: 0.2rem
          .img-wrapper
            //width: 32%
            //overflow: hidden
            flex: 1
            &:not(:first-child)
              margin-left: 2%
            >img
              width: 100%
        .app-list-advertising
          margin-bottom: 0.2rem
          .advertising-top_avatar
            position: relative
            .img-mask
              position: relative
              .mask
                position: absolute
                top: 0
                bottom: 0
                left: 0
                right: 0
                background-color: rgba(0,0,0,.9)
                z-index: 1
              >img
                width: 100%
            .information
              position: absolute
              top: 0
              bottom: 0
              left: 0
              right: 0
              z-index 2
              .replay
                position: absolute
                left: 0.2rem
                bottom: 0.2rem
                width: inherit
                color: #fff
                display: flex
                align-items: center
                >i
                  margin-right: 0.06rem
                  font-size: 0.34re
              .center
                position: absolute
                left: 50%
                top: 50%
                transform: translate(-50%,-50%)
                width: inherit
                display: flex
                flex-direction: column
                align-items: center
                >img
                  border-radius: 50%
                .txt
                  color: #fff
                  margin-top: 0.1rem
                  margin-bottom: 0.16rem
          .advertising-bottom_download
              padding: 0.16rem 0.12rem
              background-color:#e5e5e5
              display: flex
              justify-content: space-between
              align-items: center
              >a
                display: inline-block
                width: inherit
                padding: 0.08rem
                color: #197ADE
                border: 1px solid #197ADE
                border-radius: 4px
        .app-list-subtitle
          text-align: left
          font-size: 0.24rem
          padding-bottom: 0.3rem
          color: #666
          position: relative
          span
            display: inline-block
            &:not(:last-child)
                margin-right: 0.1rem
            &.top
                color: red
                padding: 0.02rem 0.04rem
                border-radius: 2px
                border: 1px solid red
            &.hot
              color: red
              padding: 0.02rem 0.04rem
              border-radius: 2px
              border: 1px solid red
            &.ad
              color: #197ADE
              padding: 0.02rem 0.04rem
              border-radius: 2px
              border: 1px solid #197ADE
            &.delete
                position: absolute
                right: 0
                top: 0
                padding: 0.02rem 0.06rem
                border: 1px solid #666
                display: flex
                align-items: center
                justify-content: center
                border-radius: 4px
                >i
                  font-size: 0.2rem
        &.left_right
            display: flex
            padding: 0.2rem 0
            .left
              flex: 1
              overflow: hidden
              display: flex
              flex-direction:column
              justify-content: space-between
              padding: 0.1rem 0
              .app-list-title
                word-wrap:break-word
                word-break:break-all
                padding: 0
              .app-list-subtitle
                padding-bottom: 0.1rem
            .app-list-img
                flex: 0 0 2.4rem
                margin-left: 0.2rem
    &.app-list-theme3
        margin-top: 0.1rem
        margin-bottom: 0.2rem
        background-color: #fff
        .app-list-item
          margin: 0 0.2rem
          position: relative
          text-align: left
          .app-list-title
            font-size: 0.3rem
            display: flex
            justify-content: space-between
            align-items: center
            padding: 0.2rem 0
            .delete
              display: flex
              justify-content: center
              align-items: center
              padding: 0.02rem 0.06rem
              border: 1px solid #666
              border-radius: 4px
              >i
                font-size: 0.2rem
          .app-list-carAdvertising
            .car-item
              display: flex
              justify-content: space-between
              align-items: center
              padding: 0.24rem 0
              border-1px(#e5e5e5)
              .flex_left
                display: flex
                .img-wrapper
                  flex: 0 0 2rem
                  >img
                    width: 100%
                .detail
                  flex: 1
                  display: flex
                  flex-direction: column
                  justify-content: space-between
                  padding: 0.1rem 0.24rem
                  .name
                    font-size: 0.3rem
                  .subscription
                    font-size: 0.24rem
              .yd-btn
                height: 0.5rem
                border-radius: 4px
          .app-list-bottom
            .txt
              display: flex
              align-items: center
              padding: 0.16rem 0
              >i
                margin-left: 0.1rem
                font-size: 0.34rem
    &.app-list-theme4
      margin-top: 0.1rem
      margin-bottom: 0.2rem
      background-color: #fff
      position: relative
      &:after
        display: block
        position: absolute
        left: 0
        bottom: 0
        border-top: 1px solid #e5e5e5
        width: 100%
        content: ''
      .app-list-item
        margin: 0 0.2rem
        position: relative
        text-align: left
        .app-list-top
          display: flex
          justify-content: space-between
          padding: 0.2rem 0
          .top_left
            display: flex
            .img-wrapper
                height: 0
                overflow: hidden
                width: 0.6rem
                padding: 0.3rem 0
                border-radius: 50%
                >img
                  width: 100%
                  margin-top: -50%
                  display: block
                  border: none
            .title
              margin-left: 0.2rem
              >span
                display: block
              .name
                  margin-bottom: 0.1rem
              .dedescription
                  color: #666

          .top_right
            >a
              display: inline-block
              width: inherit
              margin-right: 0.4rem
              color: #ef4f4f
              font-weight: 600
            .delete
              display: inline-block
              padding: 0 0.06rem
              border: 1px solid #666
              border-radius: 4px
              >i
                font-size: 0.2rem
        .app-list-body
          .content
            font-size: 0.28rem
            padding: 0.14rem 0
          .img-wrapper
            >img
              width: 32%
              margin-right: 2%
              &:nth-child(3)
                  margin-right: 0
        .app-list-footer
          display: flex
          padding: 0.16rem 0
          >span
            flex: 1
            display: flex
            justify-content: center
            align-items: center
            font-size: 0.26rem
            > i
              margin-right: 0.16rem
              font-size: 0.4rem
        .app-list-bodySpecial
          display: flex
          margin-bottom: 0.2rem
          .bodySpecial_left
              flex: 1
              padding: 0.1rem 0
              display: flex
              flex-direction: column
              justify-content: space-between
              .comment
                display: block
                margin-top: 0.2rem
          .bodySpecial_right
            flex: 0 0 2.4rem
            margin-left: 0.2rem
            >img
              width: 100%
              background-color: rgba(255,255,255,0.9)
              border: none
              display: block
    &.app-list-theme5
      background-color: #fff
      &:not(:last-child)
        margin-bottom: 0.16rem
      .app-list-item
        margin: 0 0.2rem
        position: relative
        text-align: left
        .app-list-top
          display: flex
          justify-content: space-between
          padding: 0.2rem 0
          .top_left
            display: flex
            .img-wrapper
              height: 0
              overflow: hidden
              width: 0.6rem
              padding: 0.3rem 0
              border-radius: 50%
              >img
                width: 100%
                margin-top: -50%
                display: block
                border: none
            .title
              margin-left: 0.2rem
              >span
                display: block
              .name
                margin-bottom: 0.1rem
              .fan
                color: #666
                .description
                    margin-left: 0.2rem
                    position: relative
                    &:before
                      position: absolute
                      top: 0.12rem
                      left: -0.14rem
                      content: '.'
                      width: 0.06rem
                      height: 0.06rem
                      background-color: #666
          .top_right
            .delete
              display: inline-block
              padding: 0 0.06rem
              border: 1px solid #666
              border-radius: 4px
              >i
                font-size: 0.2rem
        .app-list-title
          font-size: 0.32rem
          padding-bottom: 0.2rem
        .app-list-body
          .img-wrapper
            position: relative
            >img
              width: 100%
            .LiveBroadcasting
              position: absolute
              top: 0.1rem
              left: 0.1rem
              padding: 0.06rem
              border-radius: 4px
              color: #fff
              background-color: #ef4f4f
              z-index: 2
            .popularity
              position: absolute
              top: 0.12rem
              left: 0.88rem
              padding: 0.04rem 0.08rem
              border-radius: 4px
              color: #fff
              background-color: #666
              z-index: 1
    &.app-list-theme6
      display: inline-block
      width: 50%
      &:nth-child(even)
          .app-list-body
            position:relative
            left: 1%
      .app-list-item
        position: relative
        text-align left
        .app-list-title
          position: absolute
          bottom: 0.6rem
          left: 0
          width: 100%
          font-size: 0.28rem
          padding: 0 0.1rem
          overflow: hidden
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          word-break: break-all
          text-overflow: ellipsis
          line-height: 1.5
        .app-list-body
            width: 99%
            overflow: hidden
            >img
              width: 100%
              border: none
              display: block
        .app-list-footer
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            height: 0.6rem
            display: flex
            justify-content: space-between
            align-items: center
            padding: 0 0.1rem
            .play
              display: flex
              align-items: center
</style>
