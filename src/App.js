import React, {Component} from 'react'
import {Button, message} from 'antd'
import {NavLink,Route,Switch,Redirect} from 'react-router-dom';
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
/*
应用根组件
 */
class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
   
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Admin}/>
      </Switch>
     
    )
  }
}

export default App