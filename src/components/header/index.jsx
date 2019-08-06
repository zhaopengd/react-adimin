import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Modal } from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageutils from '../../utils/storageutils'
import {formateDate} from '../../utils/dateUtils'
import './index.less'
class Header extends Component {
    state={
        currentTime:formateDate(Date.now())
    }
    /* 
     退出登录
    */
    logout=()=>{
        //确认提示
        Modal.confirm({
            title: '确定要退出么?',
            onOk:()=> {
              console.log('OK')
              //确认后删除存储的用户信息 local中的和内存中的
              storageutils.removeUser()
              memoryUtils.user={}
              //跳转到登录界面
              /* 此方法常用在回调函数中，而return Redict 常用在render中 */
              this.props.history.replace('/login')  //此方法必须使用在路由组件中  
              // console.log(this)  此时this为undefined 所以读取不到props

            },
            onCancel() {
              console.log('Cancel');
            },
          })

        
    }
/* 根据当前请求的path得到对应的title */
    getTitle=()=>{
        let title = ''
        const path = this.props.location.pathname  //需要时路由组价
        menuList.forEach((item)=>{
          if (item.key===path) {
              title=item.title
          }else if (item.children){
            const cItem =  item.children.find(cItem=>cItem.key===path)  //自动返回
                if (cItem) {
                    title=cItem.title
                }
        }
        })
        return title
    }
    /* 动态显示时间 */
    componentDidMount(){
    this.timeID=setInterval(() => {
            this.setState({
                currentTime:formateDate(Date.now())
            })
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    render() {
        const  {currentTime}=this.state
        const user = memoryUtils.user
        //得到当前显示IDEtitle
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{user.username}&nbsp;&nbsp;
                    <a href="###" onClick={this.logout}>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt=""/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)  //   让此组件成为路由组件