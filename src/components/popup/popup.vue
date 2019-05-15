<template>
  <div>
    <app-mask v-model="show" @click.native="close" :opacity="maskerOpacity"></app-mask>
    <div :class="classes" :style="styles" ref="box" class="app-popup">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { preventScroll, pageScroll } from '../../util/assist'
  export default {
    components: {
      'app-mask': require('../mask/mask.vue').default
    },
    data() {
      return {
        show: this.value
      }
    },
    props: {
      value: {
        type: Boolean
      },
      closeOnMasker: {
        type: Boolean,
        default: true
      },
      maskerOpacity: {
        validator(val) {
          return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val)
        },
        default: 0.5
      },
      left: {
        type: Number,
        default: 0
      },
      right: {
        type: String,
        default: '0rem'
      },
      top: {
        type: String,
        default: '0rem'
      },
      bottom: {
        type: Number,
        default: 0
      }
    },
    methods: {
      close() {
        if (this.closeOnMasker) {
          this.show = false
          this.$emit('input', false)
        }
      },
      fn(e) {
        e.preventDefault()
        e.stopPropagation()
        this.close()
      }
    },
    computed: {
      classes() {
        return this.show ? 'app-popup-show' : ''
      },
      styles() {
        return { right: this.right, top: this.top }
      }
    },
    watch: {
      value(val) {
        val ? preventScroll.lock() : preventScroll.unlock()
        // val ? pageScroll.lock() : pageScroll.unlock()
        val ? document.addEventListener('touchmove', this.fn) : document.removeEventListener('touchmove', this.fn)
        this.show = val
      }
    },
    beforeDestroy() {
      preventScroll.unlock()
      pageScroll.unlock()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .app-popup
    position: fixed
    z-index: 999
    transition: opacity .2s
    pointer-events: none
    opacity: 0;
    background-color: #fff
    border-radius: 4px
    &.app-popup-show
      pointer-events: auto
      opacity 1
</style>
