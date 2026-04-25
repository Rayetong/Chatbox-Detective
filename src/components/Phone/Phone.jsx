// src/components/Phone/Phone.jsx
import React, { useState } from 'react'
import StatusBar from './StatusBar'
import ChatList from './tabs/ChatList'
import ContactList from './tabs/ContactList'
import MomentsView from './tabs/MomentsView'
import AddFriend from './tabs/AddFriend'
import ChatView from './ChatView'

// 标签类型常量
const TABS = {
  CHAT: 'chat',
  CONTACT: 'contact',
  MOMENTS: 'moments',
  ADD: 'add'
}

export default function Phone() {
  // ========== 状态管理 ==========
  const [activeTab, setActiveTab] = useState(TABS.CHAT)      // 当前选中的 Tab
  const [currentChatId, setCurrentChatId] = useState(null)   // 当前正在聊天的联系人ID
  const [isInChat, setIsInChat] = useState(false)            // 是否在聊天详情页

  // ========== 事件处理函数 ==========
  
  // 打开聊天详情页（从聊天列表或联系人列表点击）
  const handleOpenChat = (contactId) => {
    setCurrentChatId(contactId)
    setIsInChat(true)
  }

  // 从聊天详情页返回
  const handleBackFromChat = () => {
    setCurrentChatId(null)
    setIsInChat(false)
  }

  // Tab 切换（聊天详情页内不允许切换 Tab）
  const handleTabChange = (tab) => {
    if (!isInChat) {
      setActiveTab(tab)
    }
  }

  // 底部返回按钮的点击处理
  const handleBackButton = () => {
    if (isInChat) {
      handleBackFromChat()
    }
    // 如果在其他页面，按返回键不做任何事（或者可以退出 App？）
  }

  // ========== 渲染主内容区域 ==========
  const renderContent = () => {
    // 1. 如果在聊天详情页，优先显示聊天界面
    if (isInChat && currentChatId) {
      return (
        <ChatView 
          contactId={currentChatId}
          onBack={handleBackFromChat}
        />
      )
    }

    // 2. 否则根据 Tab 显示对应页面
    switch (activeTab) {
      case TABS.CONTACT:
        return <ContactList onOpenChat={handleOpenChat} />
      case TABS.MOMENTS:
        return <MomentsView />
      case TABS.ADD:
        return <AddFriend onOpenChat={handleOpenChat} />
      case TABS.CHAT:
      default:
        return <ChatList onOpenChat={handleOpenChat} />
    }
  }

  // ========== 底部 Tab 栏组件 ==========
  const TabBar = () => (
    <div className="bg-white border-t border-gray-200 flex justify-around py-2">
      {/* 聊天 Tab */}
      <button
        className={`flex flex-col items-center py-1 px-4 rounded-lg transition-colors ${
          activeTab === TABS.CHAT && !isInChat 
            ? 'text-white bg-teal-400' 
            : 'text-gray-500'
        }`}
        onClick={() => handleTabChange(TABS.CHAT)}
        disabled={isInChat}
      >
        <span className="text-2xl">💬</span>
        <span className="text-xs mt-1">聊天</span>
      </button>

      {/* 联系人 Tab */}
      <button
        className={`flex flex-col items-center py-1 px-4 rounded-lg transition-colors ${
          activeTab === TABS.CONTACT && !isInChat 
            ? 'text-white bg-teal-400' 
            : 'text-gray-500'
        }`}
        onClick={() => handleTabChange(TABS.CONTACT)}
        disabled={isInChat}
      >
        <span className="text-2xl">👤</span>
        <span className="text-xs mt-1">联系人</span>
      </button>

      {/* 朋友圈 Tab */}
      <button
        className={`flex flex-col items-center py-1 px-4 rounded-lg transition-colors ${
          activeTab === TABS.MOMENTS && !isInChat 
            ? 'text-white bg-teal-400' 
            : 'text-gray-500'
        }`}
        onClick={() => handleTabChange(TABS.MOMENTS)}
        disabled={isInChat}
      >
        <span className="text-2xl">🌐</span>
        <span className="text-xs mt-1">朋友圈</span>
      </button>

      {/* 添加 Tab */}
      <button
        className={`flex flex-col items-center py-1 px-4 rounded-lg transition-colors ${
          activeTab === TABS.ADD && !isInChat 
            ? 'text-white bg-teal-400' 
            : 'text-gray-500'
        }`}
        onClick={() => handleTabChange(TABS.ADD)}
        disabled={isInChat}
      >
        <span className="text-2xl">➕</span>
        <span className="text-xs mt-1">添加</span>
      </button>
    </div>
  )

  // ========== 渲染 ==========
  return (
    <div className="md:w-1/3 flex flex-col rounded-2xl bg-black/70 shadow-2xl p-4">
      <div className="m-3 rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden bg-white">
        {/* 状态栏 */}
        <StatusBar />
        
        {/* 主内容区 */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
        
        {/* Tab 栏 */}
        {!isInChat && <TabBar />}
        
        {/* 底部返回按钮（物理返回键风格） */}
        <div className="bg-black p-3 border-t border-white">
          <button 
            className="w-full hover:opacity-80 transition-opacity"
            onClick={handleBackButton}
          >
            <img src="/others/return_button.png" alt="返回" className="w-20 h-auto mx-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}