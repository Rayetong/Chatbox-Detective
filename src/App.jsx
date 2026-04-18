import React from 'react'
import { useState, useEffect } from 'react'
import Phone from './components/Phone/Phone'

//App组件：整个游戏的根组件
function App(){
    const items = ['证据卡片', '人物卡片','测试一','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二','测试二']
    //状态栏数据
    // 当前选中的联系人ID（null表示在联系人列表页）
    const [currentChatId, setCurrentChatId] = useState(null)
    
    // 测试：初始已解锁贾警官
    const [unlockedContacts] = useState([
        { id: 'jia', name: '贾警官', avatar: '/peopleImages/jiaAvatar.png' }
    ])

    // 处理选择联系人
    const handleSelectContact = (contactId) => {
        setCurrentChatId(contactId)
    }

    // 处理返回联系人列表
    const handleBackToList = () => {
        setCurrentChatId(null)
    }

    
    return(
        /*最外层容器：占满整个屏幕，使用flex布局*/
        <div className="flex h-screen overflow-hidden bg-teal-300">
            {/*左侧区域*/}
            {/* flex-1: 占据剩余空间（右侧固定宽度时，左侧自动填满） */}
            <div className="flex-1  p-4 flex flex-col min-w-0">
                {/* 黑板内部的内容容器 */}
                <div className="bg-amber-100/90 rounded-lg shadow-2xl h-full p-4 bg-[url('others/background.png')] bg-cover bg-center">
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
            <Phone />
        </div>
    )

}

//导出App组件，供其他文件使用
export default App

