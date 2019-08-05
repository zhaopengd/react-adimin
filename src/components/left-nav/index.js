import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Menu, Icon} from 'antd';

import Logo from '../../assets/images/logo.png'
import  './index.less'
const { SubMenu } = Menu;

/* 左侧导航组件 */
export default class LeftNav extends Component {
    
    render() {
        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/home'>
                <img src={Logo} alt="logo"/>
                <h1>硅谷后台</h1>
                </Link>
                <Menu
                defaultSelectedKeys={['/home']}
            mode="inline"
            theme="dark"
        >
          <Menu.Item key="/home">  {/* key是唯一的 所以用路径就可以 */}
            <Link to='/home'>
                <Icon type="home"/>
                <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
             <Menu.Item key="/category">  {/* key是唯一的 所以用路径就可以 */}
            <Link to='/category'>
                <Icon type="frown"/>
                <span>品类管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/product">  {/* key是唯一的 所以用路径就可以 */}
            <Link to='/product'>
                <Icon type="like"/>
                <span>商品管理</span>
            </Link>
          </Menu.Item>
          </SubMenu>
        </Menu>
            </div>
        )
    }
}
