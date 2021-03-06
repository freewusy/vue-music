<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <div v-show="songs.length !== 0">
      <scroll :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll" class="list" ref="list">
        <div class="song-list-wrapper">
          <song-list :songs="songs" @selectItem="selectItem"></song-list>
        </div>
        <div v-show="!songs.length" class="loading-container">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import Loading from '@/base/loading/loading'
import {hackStyle} from '@/common/js/dom'

const RESERVED_HEIGHT = 40

export default {
  components: {
    Scroll,
    SongList,
    Loading
  },
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImg})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.bgImgHeight = this.$refs.bgImg.clientHeight
    this.maxTranslateY = -this.bgImgHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.$refs.bgImg.clientHeight}px`
  },
  methods: {
    back() {
      this.$router.back()
    },
    random() {
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectItem(item, index) {
      this.$store.dispatch('selectPlay', {list: this.songs, index: index})
    }
  },
  watch: {
    scrollY(newy) {
      let translateY = Math.max(newy, this.maxTranslateY)
      let zIndex = 0
      let scale = 1

      if (newy > 0) {
        const percent = Math.abs(newy / this.bgImgHeight)
        scale = 1 + percent
        zIndex = 10
      }

      if (newy < this.maxTranslateY) {
        zIndex = 10
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.layer.style[hackStyle('transform')] = `translate3d(0,${translateY}px,0)`
      this.$refs.bgImg.style.zIndex = zIndex
      this.$refs.bgImg.style[hackStyle('transform')] = `scale(${scale})`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>