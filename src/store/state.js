import {playMode} from '@/common/js/config'

const state = {
  /* singer  */
  singer: {}, // 歌手详情，获取歌手详细信息
  /* player */
  playing: false, // 是否播放音乐
  fullScreen: false, // 播放器页面是否全屏
  playlist: [], // 播放(前进or后退)列表
  sequenceList: [], // 播放歌单顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 选中歌曲列表下标
}

export default state