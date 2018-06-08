import {$axios} from './index.js'
export function checkRepeat (data) {
  return $axios.get('http://efangqudao.ehaofang.net/api/company/v1/repeat', {
    params: data
  })
}
