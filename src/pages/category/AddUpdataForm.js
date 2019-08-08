import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    Form,
    Input
} from 'antd'
const Item = Form.Item
/* 添加或者修改分类的Form组件   一个组件做两件事 */
 class AddUpdataForm extends Component {
   /*   static propTypes = {
         setForm:propTypes.func.isRequired
     }
 */
    
     componentWillMount() {
         this.props.setForm(this.props.form)
         console.log(this.props.form);
         
     }
    
    render() {
    const {getFieldDecorator}= this.props.form
        return (
           <Form>
               <Item>
               {
                getFieldDecorator('categoryName',{
                    initialValue:'',
                    rules:[
                        {required:true,message:'分类名称必须输入'}
                    ]
                })(

                    <Input type='text' placeholder='请输入分类名称'/>
                )
               }
                 
               </Item>
           </Form>
        )
    }
}


export default Form.create()(AddUpdataForm)

//经过 Form.create 包装的组件将会自带 this.props.form 属性，this.props.form 提供的 API 如下：

/* 
validateFields	校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
*/



/* 
经过 getFieldDecorator 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

你不再需要也不应该用 onChange 来做同步，但还是可以继续监听 onChange 等事件。

你不能用控件的 value defaultValue 等属性来设置表单域的值，默认值可以用 getFieldDecorator 里的 initialValue。

你不应该用 setState，可以使用 this.props.form.setFieldsValue 来动态改变表单值。

*/