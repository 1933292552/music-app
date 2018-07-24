import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		uin: 0,
		format: 'json',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice:0,
		platform: 'h5',
		needNewCode: 1,
		_:1525497711456
	})

	return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getDiscSongList(dissid) {
  const url = '/api/getDiscSongList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    type: 1,
    json: 1,
    onlysong: 0,
    hostUin: 0,
    loginUin: 0,
    notice: 0,
    needNewCode: 0,
    format: 'json',
    g_tk: 999222372,
    disstid: dissid,
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}