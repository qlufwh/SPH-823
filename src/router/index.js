//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Search from "@/pages/Search"
import Register from "@/pages/Register"
//import { push } from 'core-js/core/array';
//import { compile } from 'vue/types/umd';
//先把VueRRouter原型对象的push保存一份
let orginPush =  VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;

//重写push|replace方法
//第一个参数:告诉原来的push方法:你往哪里跳转(依赖哪些参数)
//第二个参数:成功的回调
//第三个参数:失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        //call||apply的区别,都可以调用函数一次,都可以篡改上下文一次
        //call与apply传递参数,call传递参数用逗号隔开,apply方法执行,传递数组
        orginPush.call(this,location,resolve,reject)
    }else{
        orginPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resole,redirect){
    if(resolve && reject){
        orginReplace.call(this,location,resole,redirect)
    }else{
        orginReplace.call(this,location,()=>{},()=>{})
    }
}
console.log(orginPush);
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: "/Home",
            component: Home,
            meta: { show: true }
        },
        {
            path: "/Login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/search/:keyword?",
            component: Search,
            meta: { show: true },
            name: "search",
            //路由组件能不能传递props数据
            //布尔值写法:只能params
            //props:true,
            //对象写法:额外的给路由组件传递一些props
            // props:{a:1,b:2},
            //函数写法:可以parmams参数,query参数,通过props传递给路由组件
            props: (route) => {

                return {
                    keyword: route.params.keyword,
                    k: route.query.k
                }

            }
        },
        {
            path: "/Register",
            component: Register,
            meta: { show: false }
        },
        //重定向,在项目跑起来的时候,访问/,立马让他定向到首页
        {
            path: '*',
            redirect: "/Home"
        }
    ]
})