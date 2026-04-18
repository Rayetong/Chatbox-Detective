import React, { useState, useEffect } from 'react'

export default function StatusBar() {
    //状态管理
    const [currentTime, setCurrentTime] = useState('');
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [isCharging, setIsCharging] = useState(false);
    
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

    //渲染
    return(
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
    )
}
