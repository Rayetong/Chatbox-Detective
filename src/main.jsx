//导入必要库
import React from 'react' //核心React库
import ReactDOM from 'react-dom/client' //React DOM渲染库
import App from './App' //导入我们即将创建的App组件
import './index.css' //导入Tailwind样式文件

//找到index.html中挂载点
//获取index.html里id="root"的那个div
const rootElement=document.getElementById('root')

//创建React根节点
const root=ReactDOM.createRoot(rootElement);

//把App组件渲染到页面上
//<App />是React组件的写法，代表调用App函数并显示其返回的界面
root.render(<App />)