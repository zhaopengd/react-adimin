/* 
操作local 数据的工具模块
        读取user 或者删除user
*/


export default {
    saveUser(user){

        localStorage.setItem('user_key',JSON.stringify(user))
    },
    // 获取用户 需要返回一个user对象 没有的话返回一个空对象。 方面后面读取
    getUser(){
        return localStorage.getItem()
    },
    removeUser(){}
}