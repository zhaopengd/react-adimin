/* 
操作local 数据的工具模块
        读取user 或者删除user
*/

/*
进行local数据存储管理的工具模块
 */
import store from 'store'
const USER_KEY = 'user_key'
export default {
  /*
  保存user   (user就是 请求成功返回的数据)
   */
  saveUser (user) { //API文档里 返回的数据 是JSON格式的。所以进行处理
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)  //解析出来就是一个对象或数组
  },

  /*
  读取user
   */
  getUser () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
  },

  /*
  删除user
   */
  removeUser () {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
}       