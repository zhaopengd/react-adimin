
/*读取local中的user 存储用户登录信息 */

import storageutils from "./storageutils";
const user = storageutils.getUser() //从local中读取user 保存到内存中
export default {
    user
}