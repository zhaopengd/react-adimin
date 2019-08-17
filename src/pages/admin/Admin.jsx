import React, { Component } from 'react'
import {NavLink,Route,Switch,Redirect} from 'react-router-dom';
import { Layout } from 'antd';
//import storageutils from '../../utils/storageutils'
import storageutils from '../../utils/storageutils'
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../user/User'
import Line from '../user/User'
import Pie from '../user/User'

const { Footer, Sider, Content } = Layout;
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
				<Layout style={{height:'100%'}}>
						<Sider>
								<LeftNav/>
						</Sider>
						<Layout>
								<Header/>
								<Content style={{background:'white'}}>
										<Switch>
										<Route path='/home' component={Home}/>
										<Route path='/category' component={Category}/>
										<Route path='/product' component={Product}/>
										<Route path='/role' component={Role}/>
										<Route path='/user' component={User}/>
										<Route path='/charts/bar' component={Bar}/>
										<Route path='/charts/line' component={Line}/>
										<Route path='/charts/pie' component={Pie}/>
										<Redirect to='/home' />
										</Switch>
								</Content>
								<Footer style={{textAlign:'center',color:'rgba(0,0,0,0.1)'}}>
								推荐使用谷歌浏览器，可以获得更加页面操作体验
								</Footer>
						</Layout>
				</Layout>
				)
		}
}
