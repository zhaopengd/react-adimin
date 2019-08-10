/* 
商品管理
*/
import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table  } from "antd";
import LinkButton from '../../components/link-button'
const Option = Select.Option
export default class Product extends Component {
    state={
        loading:false,
        products:[
            {
                    "status": 1,
                    "imgs": [
                        "image-1559402396338.jpg"
                    ],
                    "_id": "5ca9e05db49ef916541160cd",
                    "name": "联想ThinkPad 翼4809",
                    "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                    "price": 65999,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db9fb49ef916541160cc",
                    "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
                    "__v": 0
                },
                {
                    "status": 1,
                    "imgs": [
                        "image-1559402448049.jpg",
                        "image-1559402450480.jpg"
                    ],
                    "_id": "5ca9e414b49ef916541160ce",
                    "name": "华硕(ASUS) 飞行堡垒",
                    "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
                    "price": 6799,
                    "pCategoryId": "5ca9d6c0b49ef916541160bb",
                    "categoryId": "5ca9db8ab49ef916541160cb",
                    "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
                    "__v": 0
                },
        ], //数据
    }
    initColumns=()=>{//初始化显示
        this.columns=[
            {
            title: '商品名称',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
         },
        {
            title: '商品描述',
            className: 'column-money',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            //就是让price 对应的列  如何显示数据
            render:(price)=>'￥'+ price  // 将price 取出来修改并返回  重新渲染
        },
        {
            title: '状态',
            dataIndex: 'status',
            // 状态对应的列  有按钮 和文字 所以用render
            render:(status)=>{
                let btnText='下架'
                let text = '在售'
                if(status===2){
                    btnText='上架'
                    text='已下架'
                }
                return (
                <span>
                  <button>{btnText}</button>
                  <span>{text}</span>
                </span>  
                )
            }
        },
        {
            title: '操作',
            render:(product)=>(  // ???
                <span>
                    <LinkButton>详情</LinkButton>
                    <LinkButton>修改</LinkButton>
                </span>
            )
        },
        ]
    }
    
    componentWillMount() {
        this.initColumns()
    }
    
    render() {
         const {loading,products }= this.state   
         const title =(
     <span>   
        <Select style={{ width: 200 }} value='1'>
            <Option value= '1' >按名称搜索</Option>
            <Option value= '2' >按描述搜索</Option>
        </Select>
        <Input style={{ width: 200,margin: '0,10px'}} placeholder='关键字'/>
        <Button type='primary'> 搜索</Button>
    </span> 
    )
         const extra = (
             <Button type='primary'>
             <Icon type='plus'/>
                 添加商品
             </Button>
        )   
        return (
            <Card title={title} extra={extra}>
                <Table
                rowKey='_id'

                bordered    //bordered={true}  属性值为true 的简写方式
                //纵列
                columns={this.columns}
                //数据源
                dataSource={products}
                //loading 图
                loading={loading}
                //配置分页
                pagination={{defaultPageSize: 5, showQuickJumper: true}}  //默认页数  和是否显示跳转
                />
            </Card>
        )
    }
}
