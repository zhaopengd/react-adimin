import React, { Component } from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import logo from './images/logo.png'
import './login.less'
//引入接口请求函数  ---->发请求
import {reqLogin} from '../../api'
import {NavLink,Route,Switch,Redirect} from 'react-router-dom';
const Item=Form.Item
 class Login extends Component {

    handleSubmit = e => {
        //阻止表单的提交的默认行为   我们会自己ajax请求提交
        e.preventDefault();

        //取出输入的相关数据
        const form =this.props.form
        //getFieldsValue: 获取一组输入控件的值，如不传入参数，则获取全部组件的值
       //getFieldValue : 获取一个输入控件的值
       //  收集输入的数据。
       /*  const values = form.getFieldsValue()
        const username = form.getFieldValue('username')
        const password = form.getFieldValue('password')
        // values 值 为一个对象  
        console.log(values,username,password); */
    
        //3.!!对表单所有的字段进行统一验证
        this.props.form.validateFields( async (err, {username,password}) => {
            if (!err) {
               // alert(`发登陆的ajax请求，username=${username},password=${password}`)
          const result= await reqLogin(username,password)  //次函数返回的是promise对象
          //不想用.then name我们就使用 async 和await  一旦使用await 就需要在最近的函数数前面加上 async  
           
          //登陆成功和失败
          if (result.status===0) {
 
           //跳转到admin 界面
          // <Route path='/' component={Admin}/> 在render外部  无法实现 此方法跳转  所以使用 history
          this.props.history.replace('/')   //登陆成功之后  就不让他回退了
          message.success('欢迎来搞！！！')
        } else {
            message.error(result.msg)
          }

        }else{
               // alert('验证失败！')
            }
          });
    }
    //2.!!对密码进行自定义验证
    validatePwd=(rule, value, callback)=>{
       //回调函数的参数 不是你决定的   是调用的时候传入进来的参数 
       /*  1). 必须输入
            2). 必须大于等于4位
            3). 必须小于等于12位
            4). 必须是英文、数字或下划线组成 
       */
      value=value.trim()   //去空格
      if (!value) {
          callback('密码必须输入')
      } else if(value.length<4){
           callback('密码不能小于4位')
      }else if (value.length>12) {
          callback('密码不能大于12位')
      }else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          callback('密码必须是英文、数字或下划线组成')
      }else{
          callback()   //验证通过   不传东西就是验证通过
      }
          
      
    }
    

    render() {
        //拿到下面创建的form标签的 getFieldDecorator 函数  用于和表单进行双向绑定
        const {getFieldDecorator}=this.props.form

        return (
            <div className='login'>
               <div className='login-header'>
                   <img src={logo} alt=""/>
                   <h1>后台管理系统</h1>
               </div>
               <div className='login-content'>
                   <h1>用户登录</h1>
    <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
        {getFieldDecorator('username', {
            initialvalue:'',  //初始值
            rules: [//1.!!声明式验证：使用库 已定义好的规则 进行验证
                    //whitespace  空格会被当成错误
                {required:true,whitespace:true, message: '用户名是必须的!' },
                {min:4,message:'用户名不能小于4位'},
                {max:12,message:'用户名不能大于12位'},
                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'},

                ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
           
        </Item>
        <Form.Item>
        {getFieldDecorator('password', {
            initialvalue:'',  //初始值
            rules: [
           //validator	自定义校验  值必须是回调函数
            {validator:this.validatePwd}
                
                ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
        
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
         
        </Form.Item>
      </Form>
               </div>
            </div>
        )
    }
}

/* 
理解Form组件：包含Form标签的组件
利用Form.create()包装Form组件生成一个新的组件
新的组件回想form组件传递一个重要的属性：form 属性值是一个对象类型


高阶函数
    定义：接收的参数是函数或者返回值是函数
    常见的：数组遍历相关的方法、定时器、 Promise、高阶组件
    由于组件就是一个工厂函数，
    作用：实现一个强大的，动态的功能


高阶组件：
   本质是一个函数
   函数接收一个组件，返回一个组件
   Form.create() 返回的就是一个高阶组件


方法和属性
    方法是一个特殊的属性  方法的属性值是一个函数 

*/

const WrapperFrom =  Form.create()(Login)

export default WrapperFrom  // 生成标签   <Form(Login)