import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './ProductHome'

/* 父组件引入样式 可以控制子组件样式*/
import './product.less'

/*
商品路由
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact/> {/*路径完全匹配*/}
        <Redirect to='/product'/>
      </Switch>
    )
  }
}