import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import Logo from '../../assets/images/logo.png'
import  './index.less'

/* 左侧导航组件 */
export default class LeftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/home'>
                <img src={Logo} alt="logo"/>
                <h1>硅谷后台</h1>

                </Link>
            </div>
        )
    }
}
