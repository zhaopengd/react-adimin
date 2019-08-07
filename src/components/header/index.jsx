import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Modal } from 'antd';
import {reqWeather} from '../../api'//分别暴露和统一暴露的引入方式
import menuList from '../../config/menuConfig' //默认暴露的引入方式
import memoryUtils from '../../utils/memoryUtils'
import storageutils from '../../utils/storageutils'
import {formateDate} from '../../utils/dateUtils'
import './index.less'
import LinkButton from '../link-button';
class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',//图片地址
        weather:''//天气文本
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
    /* 获取天气信息请求函数 */
   getWeather= async ()=>{
       //发请求
     const {dayPictureUrl, weather}= await  reqWeather('北京')
      //更新状态
      this.setState({
        dayPictureUrl, 
        weather
      })

    }
    
    /* 动态显示时间 */
    componentDidMount(){
    this.timeID=setInterval(() => {
            this.setState({
                currentTime:formateDate(Date.now())
            })
        },1000);
        //发送异步jsonp请求 获取天气信息
        this.getWeather()
    }

    componentWillUnmount(){
        clearInterval(this.timeID)
    }
    render() {
        const  {currentTime,dayPictureUrl, weather}=this.state
        const user = memoryUtils.user
        //得到当前显示IDEtitle
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{user.username}&nbsp;&nbsp;
                    {/*组件的标签体作为标签的children属性传入  props 会存有两个属性，onClick和 childrn  */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt=""/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)  //   让此组件成为路由组件