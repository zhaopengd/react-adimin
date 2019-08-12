/* 
包含应用中 所有请求接口的函数 --->接口请求函数 返回的都是promise对象
      在此处封装  谁想发请求就引入 然后调用函数即可。
*/
import  ajax from './ajax'
import jsonp from 'jsonp'  // axios不能发送jsonp请求

//const BASE = 'http://localhost:5000'
const BASE=''
//定义请求登陆--- post 请求方式
// 调用时将实参数据 赋值形参变量  简写方式 自动return  多行用 ()

//返回的是一个promise对象
export const reqLogin= (username,password)=>ajax.post(BASE+'/login',{username,password} )
                                        //当做对象发送请求        对象简写方式                       
//分别暴露的  引入方式 import {reqLogin} from '../../api'




                                        


  /*  //当做函数发送请求
    ajax({ //配置对象  
        method:'post',
        url:BASE+'/login', 
        data:{ 
            username,
            password
        } 
    }) */






/* 
export  function reqLogin(username,password) {
//获取axios post请求返回结果 需要return，返回promise对象，调用函数之后才能  .then  .catch
return ajax({ //配置对象 ！！！！！！ 
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
}  */



/* 
const n='admin'
const p = 'admin'
reqLogin(n,p).then((res)=>{
//得到返回的数据
 const result = res.data
    console.log(result,'请求成功了');   
},(err)=>{console.log(err);
})  */
/* 
//每次想要 获取数据都需要 .data  很烦 进一步改进  用响应拦截器 看ajax.js
const n='admin'
const p = 'admin2'
reqLogin(n,p).then((result)=>{
//得到返回的数据
    console.log(result,'请求成功了');   

   // 将res 请求错误时  返回的promise对象为 pending状态 次回调就不会执行了
},(err)=>{console.log(err.message); //应用响应拦截器，解决 。message
})  */

/*
通过jsonp请求获取天气信息
 */
export function reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
// 不像axios 自动返回promise对象  这个需要自己返回，因为所有接口请求函数都应该返回接口请求函数。                   
    return new Promise((resolve, reject) => {//执行器函数：内部执行异步任务的函数 ，成功了调用resolve()，失败调用reject()
      jsonp(url, {//配置对象
        param: 'callback'
      }, (error, response) => {
        if (!error && response.status == 'success') {
          const {dayPictureUrl, weather} = response.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})//图片和文本      ？？？？？？
        } else { //失败的 
          alert('获取天气信息失败')
        }
      })
    })
  }

/*  axios 以下三种方式都可以   默认get请求 可以不写 */

  /* 获取分类列表 */
//export const reqCategorys=()=>ajax.get(BASE + '/manage/category/list')

/* export const reqCategorys=()=>ajax({  //默认不写就是get请求
  method:'GET' ,
  url:BASE + '/manage/category/list',
})
  */
 //  获取分类的请求。。
 export const reqCategorys=()=>ajax(BASE + '/manage/category/list')

//添加分类   添加分类的请求
export const reqAddCategory=(categoryName)=>ajax.post(BASE + '/manage/category/add',{
  categoryName
})


//修改分类
export const reqUpdataCategory=({categoryId,categoryName})=>ajax.post(BASE + '/manage/category/update',{
  categoryId,
  categoryName,
})

/* 
  获取商品分页列表
*/
export const reqProducts =(pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{
  params:{//看接口文档 包含所有 quqery参数的对象
    pageNum,
    pageSize
  }
})
