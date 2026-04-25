// src/components/Phone/ChatList.jsx
import React from 'react'
import { getAddedCharacters } from '/src/data/characters.js'

export default function ChatList({ onOpenChat }) {
  // 获取已添加的好友（有聊天记录的角色）
  const contacts = getAddedCharacters()

  // 模拟每条聊天记录的最后一条消息和未读数量
  // 实际应该从对话历史中获取，这里先用模拟数据
  const getLastMessage = (contactId) => {
    // TODO: 从对话记录中获取最后一条消息
    return '点击开始对话...'
  }

  const getUnreadCount = (contactId) => {
    // TODO: 从对话记录中计算未读数量
    return 0
  }

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-lg font-bold">聊天</h2>
      </div>
      
      {/* 聊天列表 */}
      <div className="flex-1 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            暂无聊天记录
          </div>
        ) : (
          contacts.map(contact => (
            <div 
              key={contact.id}
              className="flex items-center gap-3 p-3 border-b hover:bg-teal-100 cursor-pointer"
              onClick={() => onOpenChat(contact.id)}
            >
              {/* 头像 */}
              <div className="relative">
                <img 
                  src={contact.avatar} 
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/48' }}
                />
                {/* 未读红点 */}
                {getUnreadCount(contact.id) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadCount(contact.id)}
                  </span>
                )}
              </div>
              
              {/* 信息 */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-xs text-gray-400">刚刚</div>
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {getLastMessage(contact.id)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}