/* 
包含应用中 所有请求接口的函数 --->接口请求函数
      在此处封装  谁想发请求就引入 然后调用函数即可。
*/
import  ajax from './ajax'

//const BASE = 'http://localhost:5000'

//定义请求登陆--- post 请求方式
// 调用时将实参数据 赋值 形参变量
export  function reqLogin(username,password) {
    ajax({ //配置对象
    
        method:'post',
        url:'/login', //配置完代理  就不存在跨域问题了
        data:{
            username,
            password
        }

    })
} 



const n='admin'
const p = 'admin'

reqLogin(n,p)