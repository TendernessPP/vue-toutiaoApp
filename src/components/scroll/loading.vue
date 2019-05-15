<template>
  <div class="mf-loading-container">
    <img src="../../../src/assets/image/loading.gif">
  </div>
</template>
<script>
  const COMPONENT_NAME = 'loading'
  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="stylus" scoped>
  .mf-loading-container
    img
      width: 25px
      height: 25px
      display: block
</style>
