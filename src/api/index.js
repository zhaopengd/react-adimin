/* 
包含应用中 所有请求接口的函数 --->接口请求函数
      在此处封装  谁想发请求就引入 然后调用函数即可。
*/
import qs from 'qs'
import  ajax from './ajax'

//const BASE = 'http://localhost:5000'

//定义请求登陆--- post 请求方式
// 调用时将实参数据 赋值 形参变量
export  function reqLogin(username,password) {
//获取axios post请求返回结果 需要return，返回promise对象，调用函数之后才能  .then  .catch
return ajax({ //配置对象  
        method:'post',
        //url:'http://localhost:3000/login'
        url:'/login', //配置完代理  就不存在跨域问题了
        data:{  //data是对象的时候 默认使用json格式的请求体携带参数
            username,
            password
        } 
       //  username=admin&password=admin 
       // data:qs.stringify({username,password})   // 不想用json格式  想要 形成 urlencoded 形式  地址栏  a:1&b:1形式
    })
} 
/* 
const n='admin'
const p = 'admin'
reqLogin(n,p).then((res)=>{
//得到返回的数据
 const result = res.data
    console.log(result,'请求成功了');   
},(err)=>{console.log(err);
})  */

//每次想要 获取数据都需要 .data  很烦 进一步改进  用响应拦截器 看ajax.js
const n='admin'
const p = 'admin2'
reqLogin(n,p).then((result)=>{
//得到返回的数据
    console.log(result,'请求成功了');   

   // 将res 请求错误时  返回的promise对象为 pending状态 次回调就不会执行了
},(err)=>{console.log(err.message); //应用响应拦截器，解决 。message
}) 