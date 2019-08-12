import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom';
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'

import Logo from '../../assets/images/logo.png'
import  './index.less'
const { SubMenu } = Menu;

/* 左侧导航组件 */
 class LeftNav extends Component {

/* 
   方法二；依据reduce+递归实现
*/
getMenuNodes2=(menuList)=>{

     // 请求的路径
    const path = this.props.location.pathname
    
    return menuList.reduce((pre,item)=>{
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
            /* 
            判断当前的Item的key 是否是我需要的openKey
            查找item所欲的children中的childrenItem的key，看是否有一个请求的path匹配

            */
           
          const cItem =  item.children.find(cItem=>cItem.key===path)
           if (cItem) {
                this.openKey =item.key
            }        

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
    

    componentDidMount(){// 只执行一次 第一次render之后

    }
    componentWillMount(){//第一次render之前，执行一次
      // 为了使 left-nav只渲染一次，所以放到这里
      this.menuNodes= this.getMenuNodes2(menuList)  //异步创建
    }

    render() {
        //保证先存储 openkey  再去读
       // const menuNodes= this.getMenuNodes2(menuList)
        //得到当前请求的路由路径 --->动态实现默认选中效果，就是输入那个地址，left-nav中的哪个就被选中
        // location 下面有一个 pathname！！！
        // 由于不是路由组件  所以你读取不到  history location match 三个属性
        const selectKey = this.props.location.pathname //Cannot read property 'pathname' of undefined  当读取一个对象的属性不存在时 为undefined
        console.log(selectKey);
        
        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/home'>
                <img src={Logo} alt="logo"/>
                <h1>硅谷后台</h1>
                </Link> 

            <Menu
           // defaultSelectedKeys={['/home']}  不能写死 要不然输入地址 不会被选中
            defaultSelectedKeys={[selectKey]}
            
            //默认打开的menu   也不能写死 和上面的selectKey不同，
            defaultOpenKeys={[this.openKey]} 
            mode="inline"
            theme="dark"
        >
        {//通过menuList 生成含有Menu.Item 和 SubMenu  标签的数组 
          
           this.menuNodes
        }
        </Menu>
            </div>
        )
    }
}

/*
向外暴露使用高阶组件withRouter包装之后产生的新组件 
像lefet-nav 传递路由组件独有的三个属性  history location match
使left-nav 具有路由组件的性质
*/
 export default withRouter(LeftNav) 


 /* 
 1. 默认选中对应的menuItem
 2. 有可能需要默认打开对应的SubMenu： 访问的是某个二级菜单项对应的path
 
 */