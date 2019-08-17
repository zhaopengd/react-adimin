import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdataCategory} from '../../api'
import AddUpdataForm from './AddUpdataForm'
export default class Category extends Component {
  state={
    loading:false, //是否正在请求加载中  显示loading图
    categorys:[],// 所有分类的数组
    showStates:0      //对话框是否显示 0 代表不显示  1 代表显示添加  2 代表显示修改 //  123456 转化为布尔值都为true。
  }
//初始化table 所有列的描述信息
  initColums=()=>{
    this. columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',  // 去下面数据找name   
      //render: text => <a href="javascript:;">{text}</a>,  //   给每个对应数据 name 设置成 a 标签
    },
    {
      title: '操作', 
      width:300,										/* 形参名字随便起  回调的形参赋值  不是你控制的 */
      render:(category)=><LinkButton onClick={()=>{ //声明形参  方便点击的时候知道点击的是谁
        this.category=category// 保存分类名称 使之随处可见
        this.setState({showStates:2}) //点击显示  category： 就是渲染时候没有指定 dataIndex， 那么直接把数据对象给你
      }}>修改分类</LinkButton>
    },
  ]
}
/* 异步获取分类列表数据 */
  getCategorys= async ()=>{
   //显示iloading
   this.setState({loading:true})
   const result = await reqCategorys()
   console.log(result);
   //隐藏loading
   this.setState({loading:false})
   if (result.status===0) {//成功
      //取出分类数据
       const categorys=result.data
       //更新数据状态
      this.setState({
        categorys
      })
   } else {
     message.error('获取分类列表失败')
   }
  }
  //点击确定的回调： 添加或者修改
  handleOk= ()=>{
    //进行表单验证  (antd form 组件   与登录差不多)
    this.form.validateFields(async (err,value)=>{  //此处的value 就是子组件输入框的值    属性名为 getFieldDecorator()的第一个参数categoryName  值为value
      if (!err) {
        this.form.resetFields()//重置输入的数据
        console.log(value);
         //验证通过后，得到输入数据
       //   console.log(this.form.getFieldsValue()); 这样也能获取到数据
         const {categoryName} =value

         const {showStates}=this.state
         let result    //  在外面声明   外面才能看到
         if (showStates===1) {//添加
         //发送添加分类的请求
         result = await  reqAddCategory(categoryName) ///  ????这个请求有用？？？？是像服务器添加分类么？？？？
         console.log(result);
       
         }else{//修改
         const categoryId = this.category._id
         console.log(categoryId);
         
         result = await  reqUpdataCategory({categoryId,categoryName}) 
         console.log(result);
         
        }
        this.form.resetFields() // 重置输入数据(变成了初始值)
          //隐藏添加对话框
           this.setState({showStates:0}) 
           const action = showStates===1?  '添加':'修改'
         // 根据响应结果不同分别处理数据
         if (result.status===0) {
          //如果添加数据成功  则调用getCategorys 获取分类的函数 更新状态，重新获取分类列表。显示分类到下面列表
          this.getCategorys()
          //提示
          message.success(action+"分类成功")
         } else {
          message.error(action+'分类失败')
        }
         
      
      }
    })

   
  }
  //点击取消的回调： 只需要让showState状态为0
  handleCancel=()=>{					//重置是指变成初始值
    this.form.resetFields()//重置输入的数据！！！！取消修改  就不需要输入框的值了
    this.setState({
      showStates:0
    })
  }
  componentWillMount() {//  不要在生命周期函数中写太多
    this.initColums()
  }
  componentDidMount() {
    this.getCategorys()
  }

  render() {
    //取出状态数据
    const {categorys,loading,showStates}=this.state
    //读取修改分类的名称
    const category=this.category || {}   //渲染的时候没有点击修改分类 所以渲染的时候可能为空避免报错
    // Card的右侧的添加按钮  
    const extra = (
      <Button type='primary' onClick={() => {
        this.category=null//或者空对象解决点击修改之后，再点添加 有值得问题
        this.setState({showStates:1}) 
        } } >
        <Icon type='plus'/>
        添加
      </Button>
    )
    return (
      <Card  extra={extra}>
        <Table
          rowKey='_id'
          bordered    //bordered={true}  属性值为true 的简写方式
          //纵列
          columns={this.columns}
          //数据源
          dataSource={categorys}
          //loading 图
          loading={loading}
          //配置分页
          pagination={{defaultPageSize: 5, showQuickJumper: true}}  //默认页数  和是否显示跳转
        />  
         <Modal
          title={showStates===1? '添加分类':'修改分类'}
          //显示隐藏
          visible={showStates!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         {/* 将子组件传递过来的form对象保存到当前组件上 */}
         <AddUpdataForm setForm={form=>this.form=form} categoryName={category.name}/>{/* 此组件即可做添加，也可以做修改 */}
        </Modal>                                                     {/* 此处有坑 */}                  
      </Card>
    )
  }
}
