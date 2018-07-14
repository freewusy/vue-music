import * as types from './mutation-types'

export const setSinger = ({ commit }, singer) => {
  commit(types.SET_SINGER, singer)
}