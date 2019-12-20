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

// 点赞
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 收藏
export const articleCollect = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 评论列表
export const getCommentsById = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}
// 发布评论
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
