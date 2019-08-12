/* 
商品管理
*/
import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table  } from "antd";
import LinkButton from '../../components/link-button'
import {reqProducts}  from '../../api'; 
const Option = Select.Option
export default class Product extends Component {
    state={
        loading:false,
        //数据
        products:[
        ], 
        total: 0 ,    //商品的总数量
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
            width:100,
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
                  <button>{btnText}</button><br/>
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
    /* 异步获取指定页码商品列表显示 */
    getProducts = async (pageNum) => {
        //发请求获取数据
        const result = await reqProducts(pageNum,2)
        console.log(123);
        
        //判断数据的准确性
        if (result.status===0) {
            const {total,list} = result.data //取出我们需要的数据
            this.setState({
                product:list,
                total:total
            })
        }
    }
    
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount(){
        //获取第一页显示，请求函数中需要两个参数。
        this.getProducts(1)
    }
    
    render() {
         const {loading,products, total }= this.state   
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
                //配置分页                                                             //改变页码的时候 获取数据   千万不要加括号。          
                pagination={{total, defaultPageSize: 2, showQuickJumper: true,onChange:this.getProducts}}  //默认页数  和是否显示跳转
                />
            </Card>
        )
    }
}
