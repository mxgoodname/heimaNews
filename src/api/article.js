import axios from '@/utils/myaxios.js'

export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 文章详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
