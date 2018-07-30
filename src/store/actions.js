import * as types from './mutation-types'

// export const setSinger = ({ commit }, singer) => {
//   commit(types.SET_SINGER, singer)
// }

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_CURRENTINDEX, index)
}