import React, { Component } from 'react'
import {NavLink,Route,Switch,Redirect} from 'react-router-dom';
import Login from '../login/Login'
//import storageutils from '../../utils/storageutils'
import storageutils from '../../utils/storageutils'
import memoryUtils from '../../utils/memoryUtils';
export default class Admin extends Component {
    render() {
    //如果用户访问登陆页面，如果信息存在 直接让她去admin页面
    //读取保存的user，如果不存在，直接跳转到登陆界面  
   // const user = JSON.parse( localStorage.getItem('user_key')||'{}')
   // const user =storageutils.getUser()
   const user = memoryUtils.user
   if (!user._id) {
    //如果用户不存在 自动跳转到login界面     
    //  this.props.history.replace('/login')  在render中不能这么跳转，此方法一般在时间回调函数里面做
      return <Redirect to='/login'/> //自动跳转到指定的路由路径
    // return <Route path='/login' component={Login}/>   Redirect  重定向    也可以加一个From 从哪定到那里。
    }
        return (
            <div>
                hello,{user.username}
            </div>
        )
    }
}
