/* 入口js */


import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import  './api'

ReactDOM.render(
<BrowserRouter>
<App/>
</BrowserRouter>
,document.getElementById('root'))
									