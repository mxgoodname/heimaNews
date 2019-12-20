import axios from '@/utils/myaxios.js'
// 登录
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 获取信息
export const getUserInfo = id => {
  return axios({
    url: `/user/${id}`
  })
}
// 修改
export const editUser = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: 'post',
    data
  })
}
// 注册
export const registerUser = (data) => {
  return axios({
    url: '/register',
    method: 'post',
    data
  })
}
// 关注
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 关注列表
export const getFollowList = (id) => {
  return axios({
    url: `/user_follows`
  })
}
// 收藏文章列表
export const getArticleLike = () => {
  return axios({
    url: '/user_star'
  })
}
