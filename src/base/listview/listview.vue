<template>
  <scroll
    class="listview"
    ref="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li class="list-group" ref="listGroup" v-for="(group, index) in data" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut"
        @touchstart.stop.prevent="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove"
        @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList"
          :data-index="index"
          :key="index" class="item"
          :class="{'current':currentIndex===index}"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import { getData } from '@/common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  components: {
    Scroll,
    Loading
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  computed: {
    shortcutList() {
      let list = this.data.map(item => item.title.substr(0, 1))
      return list
    },
    fixedTitle() {
      if (this.scrollY >= 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    onShortcutTouchStart(e) {
      let anchorIndex
      if (e.target.dataset) {
        anchorIndex = e.target.dataset.index
      } else {
        anchorIndex = getData(e.target, 'index')
      }

      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this._scroll(anchorIndex)
    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      let speed = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      /**
       * | 运算符 是通过转换二进制计算(注意，这里的计算不是相加，而是 或 运算)，3|4 => 0011 + 0100 = 0111(7), 4|4 => 0100 + 0100 = 0100(4)
       * number|0 => 在正数的时候相当于Math.floor(),负数的时候相当于Math.ceil()
       */
      let anchorIndex = this.touch.anchorIndex * 1 + speed
      this._scroll(anchorIndex)
    },
    _scroll(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.data.length - 1) {
        index = this.data.length - 1
      }
      this.currentIndex = parseInt(index)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      if (list) {
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (!listHeight.length) {
        return
      }
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translateY(${fixedTop}px)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
