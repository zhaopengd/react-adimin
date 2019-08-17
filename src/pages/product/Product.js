import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductHome from './ProductHome'
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'

/* 父组件引入样式 可以控制子组件样式*/
import './product.less'

/*
商品路由
 */
export default class Product extends Component {
	render() {
		return (
			<Switch>
				 <Switch>
				<Route path="/product" exact component={ProductHome}/>
				<Route path="/product/addupdate" component={ProductAddUpdate}/>
				<Route path="/product/detail/:id" component={ProductDetail}/>
				<Redirect to="/product" />
			</Switch>
			</Switch>
		)
	}
}