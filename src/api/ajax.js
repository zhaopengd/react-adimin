/* 
封装ajax请求的函数 像外暴露的本质是axios
  1. 应用interceptors 解决post请求 携带参数问题 ： 默认是json， 需要转换成urlencode形式   ---->qs.stringify(data)
  2.让请求的结果不再是response，而是response.data
  3.统一处理所有请求的异常错误
  */
import { message } from "antd";  //引入 message 来提示错误
import axios from 'axios'
import qs from 'qs'

//对所有的post请求 data 的对象进行字符串化  Interceptors 请求拦截器

//添加请求拦截器 让 post请求的请求体的格式转化为 urlencided格式 a:1&b:1形式
axios.interceptors.request.use(function (config) {

    //得到请求方式和请求体数据
    const {method,data}=config  //----> 配置对象在 index.js 中的
    //处理post请求，将data对象转换成query参数格式字符串
    if (method.toLowerCase()==='post'&& typeof data==='object') {
       config.data =  qs.stringify(data)
    }
    return config;
  });

  /* 
    1.让请求的结果不再是response，而是response.data
    2.统一处理所有请求的异常错误
  
  */
// Add a response interceptor 添加响应的拦截器，在请求返回值后，且在我们指定的请求回调之前执行
axios.interceptors.response.use(function (response) {
  // Do something with response data  我们想用的数据就是response.data
 
  return response.data;//此返回结果就会交给我们指定的请求响应的回调 ---->index.js 中的请求回调

}, function (error) {  //  统一处理所有请求异常错误，不用再去具体请求中处理
  /*  Do something with response error
  return Promise.reject(error);
   如果出现错误   会先执行 拦截器的 回调，然后在执行请求失败的回调，现在想要在拦截器里直接解决错误! 不在去执行请求失败的回调
  请求的回调是依据拦截器的Promise回调返回结果判断  是否执行，如果是reject 请求的回调就会执行
   如果  返回一个pending状态的promise，就会中断promise链
  */
  message.error('请求出错'+error.message)
  return new Promise(()=>{}) // new 之后 初始化就是pending状态。
});


export default axios