import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'

import Logo from '../../assets/images/logo.png'
import  './index.less'
const { SubMenu } = Menu;

/* 左侧导航组件 */
export default class LeftNav extends Component {

/* 
   方法二；依据reduce+递归实现
*/
getMenuNodes2=(menuList)=>{
    
    return menuList.reduce((pre,current)=>{
        // 可能向 pre 中添加 <Menu.Item>
        if (!item.children) {
          pre.push(
            <Menu.Item key={item.key}>  {/* key是唯一的 所以用路径就可以 */}
            <Link to={item.key}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
            </Link>
            </Menu.Item>
          )}
          else{
              pre.push(
                <SubMenu
                key={item.key}
                title={
                <span>
                     <Icon type={item.icon} />
                    <span>{item.title}</span>
                </span>
                 }
                 >
                 {
                     this.getMenuNodes2(item.children)  //!!!此处是重点，  调用此方法生成children下的<Item></Item>
                 }
                </SubMenu>
              )
          }
        return pre
    }
    ,[])
}






    //根据只等的mennu数组生成标签数组，依据 map方法+函数递归
    getMenuNodes=(menuList)=>{
        return menuList.map(item=>{

            if (!item.children) {
              return (
                <Menu.Item key={item.key}>  {/* key是唯一的 所以用路径就可以 */}
                <Link to={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Link>
                </Menu.Item>
              )
            }
            
              return (
                                    
                <SubMenu
                key={item.key}
                title={
                <span>
                     <Icon type={item.icon} />
                    <span>{item.title}</span>
                </span>
                 }
                 >
                 {
                     this.getMenuNodes(item.children)  //!!!此处是重点，  调用此方法生成children下的<Item></Item>
                 }
                </SubMenu>
              )
        })
    }
    



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
        {//通过menuList 生成含有Menu.Item 和 SubMenu  标签的数组 
          
        this.getMenuNodes(menuList)
        }
        </Menu>
            </div>
        )
    }
}


