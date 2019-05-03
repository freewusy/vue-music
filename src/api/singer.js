import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'yqq',
    needNewCode: '0',
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })

  return jsonp(url, data, options)
}

export function getPurlUrl(mids) {
  const url = '/api/getPurlUrl'
  const data = {
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '3869232352',
        songmid: mids || [],
        songtype: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uin: '0',
        loginflag: 0,
        platform: '23',
        h5to: 'speed'
      }
    },
    comm: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      ct: 23,
      cv: 0
    }
  }
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
