<template>
  <div class="m-header">
    <div class="icon">QQ音乐</div>
    <!-- <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    background-color: #31c27c
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 116px
      height: 32px
      margin-right: 9px
      background-image: url(./logo.png);
      background-size: cover;
      background-repeat: no-repeat;
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>