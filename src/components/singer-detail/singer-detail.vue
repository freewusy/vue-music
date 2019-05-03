<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImg" :songs="songs" :plays="plays"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, getPurlUrl } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
import MusicList from '../music-list/music-list'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      plays: []
    }
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImg() {
      return this.singer.avatar
    }
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      let id = this.singer.id
      if (!id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          let mids = this.songs.map((item) => {
            return item.mid
          })
          this._getPurlUrl(mids)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    _getPurlUrl(mids) {
      getPurlUrl(mids).then((res) => {
        if (res.code === ERR_OK) {
          this.plays = res.req_0.data.midurlinfo.map(item => {
            return {
              mid: item.songmid,
              purl: item.purl
            }
          })
        }
      }).catch(e => {
        console.log(e)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let {musicData} = item
        if (musicData.songmid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>