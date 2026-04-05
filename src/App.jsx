import React from 'react'
import { useState, useEffect } from 'react'
//App组件：整个游戏的根组件
function App(){
    const items = ['证据卡片', '人物卡片','测试一','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二']
    //状态栏数据
    const [currentTime,setCurrentTime]=useState('12:00')
    const [batteryLevel,setBatteryLevel]=useState(80)
    const [isCharging,setIsCharging]=useState(false)

    //获取当前时间
    useEffect(()=>{
        const updateTime=()=>{
            const now=new Date();
            const hours=now.getHours().toString().padStart(2,'0');
            const minutes=now.getMinutes().toString().padStart(2,'0');
            setCurrentTime(`${hours}:${minutes}`)
        }
        updateTime()
        const interval=setInterval(updateTime,1000)
        return ()=>clearInterval(interval)
    },[])

    // //获取电池
    useEffect(()=>{
        if('getBattery' in navigator){
            navigator.getBattery().then(battery=>{
                //更新电池信息
                const updateBatterInfo=()=>{
                    setBatteryLevel(Math.round(battery.level*100))
                    setIsCharging(battery.charging)
                }
                updateBatterInfo()
                //监听电池状态变化
                battery.addEventListener('levelchange',updateBatterInfo)
                battery.addEventListener('chargingchange',updateBatterInfo)
                return()=>{
                    battery.removeEventListener('levelchange',updateBatterInfo)
                    battery.removeEventListener('chargingchange',updateBatterInfo)
                }
            })
        }
    },[])

    // 获取电池图标
    const getBatteryIcon = () => {
        let ans=''
        
        if (batteryLevel === null) {
            ans+='🔋'  // 未知
        }
        if (batteryLevel >= 80) {
            ans+='🔋'
        } else if (batteryLevel >= 50) {
            ans+='🔋'
        } else if (batteryLevel >= 20) {
            ans+='🔋'
        } else {
            ans+='⚠️'  // 低电量警告
        }
        if (isCharging) {
            ans+=' 充电中😋'  // 充电中
        }
        return ans
    }

    return(
        /*最外层容器：占满整个屏幕，使用flex布局*/
        <div className="flex h-screen overflow-hidden bg-teal-300">
            {/*左侧区域*/}
            {/* flex-1: 占据剩余空间（右侧固定宽度时，左侧自动填满） */}
            <div className="flex-1  p-4 flex flex-col min-w-0">
                {/* 黑板内部的内容容器 */}
                <div className="bg-amber-100/90 rounded-lg shadow-2xl h-full p-4 bg-[url('./public/others/background.png')] bg-cover bg-center">
                    {/* 这里将来放 ReactFlow 画布 */}
                    <div className="text-stone-600 text-center mt-20">
                        人物卡片+证据卡片位置
                    </div>
                </div>
                {/* 下方：物品栏（固定高度） */}
                <div className="h-44 bg-teal-800 rounded-lg shadow-2xl backdrop-blur-sm overflow-x-auto custom-scrollbar">
                    <div className="flex gap-3 h-full items-center p-3">
                        {items.map((item,i)=>(
                            <div key={i} className="shadow-[0_0_25px_rgba(167,243,208,0.9)] p-4 w-28 h-28 bg-amber-100 rounded-lg flex-shrink-0 flex items-center justify-center text-xs hover:scale-105 transition-transform cursor-pointer">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* ========== 右侧：手机区域 ========== */}
            <div className="md:w-1/3  flex flex-col rounded-2xl bg-black/70 shadow-2xl p-4">
                <div className=" m-3 rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden">
                    {/* 手机外壳效果：圆角 + 阴影 + 内边距 */}
                    {/* 手机状态栏（仿真的小细节） */}
                    <div className="bg-black px-4 flex py-2 text-center text-sm text-white justify-between items-center">
                        {/* 左边时间显示 */}
                        <div className="text-white font-medium">
                            {currentTime}
                        </div>
                        {/* 右边电池状态 */}
                        <div className="flex items-center gap-2 text-white">
                            <span className="text-xs">
                                {getBatteryIcon()} {batteryLevel}%
                            </span>
                        </div>
                    </div>
                    {/* 手机主内容区 */}
                    <div className="flex-1 p-3 overflow-y-auto  bg-[url('./public/others/phoneBackground.png')] bg-cover bg-center">
                        手机界面
                        <div className="text-sm mt-2">联系人列表/聊天记录</div>
                    </div>
                
                {/* 返回按键 */}
                    <div className="bg-black p-3 border-t border-white">
                        <button className="w-full hover:opacity-80 transition-opacity"
                        onClick={()=>console.log('返回')}>
                            <img src="/public/others/return_button.png" alt="返回" className="w-20 h-auto mx-auto"/>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )

}

//导出App组件，供其他文件使用
export default App

