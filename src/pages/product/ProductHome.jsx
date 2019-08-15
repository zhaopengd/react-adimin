/* 
商品管理
*/
import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table, message  } from "antd";
import LinkButton from '../../components/link-button'
import {reqProducts, reqSearchProducts,reqUpdateStatus}  from '../../api'; 
import {PAGE_SIZE} from '../../utils/Constants';
const Option = Select.Option

/* 商品管理的首页组件 */

export default class ProductHome extends Component {
    state={
        loading:false,
        //数据
        products:[], 
        total: 0 ,    //商品的总数量
        searchType:'productName',  //默认是按商品名称搜索 option 的value 为这个
        searchName:'' //搜索关键字  默认为空  动态获取输入框的值  作为发请求的参数。
    }
    updateStatus= async (productId,status)=>{
        //计算更新后的值
        status=status===1? 2 : 1
        const result= await reqUpdateStatus(productId,status)
        if (result.status===0) {
            message.success('更新商品状态成功')
            //获取当前页显示 因为你下面写的1
            this.getProducts(this.pageNum)
        }
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
           // dataIndex: 'status',
            // 状态对应的列  有按钮 和文字 所以用render
            render:({_id,status})=>{
                let btnText='下架'
                let text = '在售'
                if(status===2){
                    btnText='上架'
                    text='已下架'
                }
                return (
                <span>
                  <button onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</button><br/>
                  <span>{text}</span>
                </span>  
                )
            }
        },
        {
            title: '操作',
            render:(product)=>(  // 此处的 product 和category同理   
                <span>
                    <LinkButton
						onClick={()=>{						 
						this.props.history.push('/product/detail',product)
					}}
					>
						详情
					</LinkButton>
                   
				 <LinkButton>修改</LinkButton>
                </span>
            )
        },
        ]
    }       
    /* 异步获取指定页码商品列表显示 */  
    getProducts = async (pageNum) => {
        //保存当前页码(为了更新状态时能够看见)
        this.pageNum=pageNum
        let result 
        const {searchName,searchType}=this.state
        /* 点击搜索按钮的时候，显示当前名称的页面 */
        if (!searchName) {
             //发请求获取数据  两种请求的返回结果是一样的  所以写在一起
              result = await reqProducts(pageNum,PAGE_SIZE)
              console.log(result.data.list);
              
        }else{
             result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }
        //判断数据的准确性
        if (result.status===0) {
            const {total,list} = result.data //取出我们需要的数据
            console.log(list);
            
            this.setState({
                products:list,
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
         const {loading,products, total,searchType,searchName }= this.state   
         const title =(
     <span>                                                            
        <Select 
         style={{ width: 200 }} 
         value={searchType}
         //实现下拉框 根据状态 动态改变。
         onChange={(value)=>this.setState({searchType:value})} /* 看文档 Select value: option 对应的value */ 
    >
         <Option value= 'productName' >按名称搜索</Option>
         <Option value= 'productDesc' >按描述搜索</Option>
        </Select>
        <Input
         style={{ width: 200,margin: '0,10px'}} 
         placeholder='关键字' 
         value={searchName}
         onChange={event=>this.setState({searchName:event.target.value})}  // 看input组件文档
         />
        <Button
           onClick={()=>this.getProducts(1)} // 点击搜索之后 你不就应该显示第一页
            type='primary'
        > 
            搜索</Button>
    </span> 
    )
         const extra = (
             <Button type='primary' >
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
                pagination={{
                    total, 
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange:this.getProducts,
                    current:this.pageNum//当前显示页码
                    }}  //默认页数  和是否显示跳转
                />
            </Card>
        )
    }
}
