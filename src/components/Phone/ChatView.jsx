// src/components/Phone/ChatView.jsx
import React, { useState, useEffect } from 'react'
import { getCharacterById } from '/src/data/characters'
import { getDialogueStart, getDialogueNode } from '/src/data/dialogues/index.js'

export default function ChatView({ contactId, onBack }) {
  // ========== 状态管理 ==========
  const [messages, setMessages] = useState([])      // 消息历史
  const [currentNodeId, setCurrentNodeId] = useState(null)  // 当前对话节点
  const [currentOptions, setCurrentOptions] = useState([])  // 当前可选回复
  const [isTyping, setIsTyping] = useState(false)   // 对方是否正在输入
  
  // 获取角色信息
  const character = getCharacterById(contactId)
  
  // ========== 添加消息到聊天记录 ==========
  const addMessage = (speaker, content, isPlayer = false) => {
    // content 是数组，每个元素可以是 {type:'text', value:'...'} 或 {type:'image', value:'...'}
    const newMessage = {
      id: Date.now(),
      speaker: isPlayer ? 'player' : speaker,
      speakerName: isPlayer ? '我' : character?.name,
      content: content,
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, newMessage])
  }
  
  // ========== 显示对话节点 ==========
  const displayNode = async (nodeId) => {
    const node = getDialogueNode(contactId, nodeId)
    if (!node) return
    
    // 1. 显示对方的消息
    addMessage(contactId, node.content, false)
    
    // 2. 保存选项供玩家选择
    setCurrentOptions(node.options || [])
    setCurrentNodeId(nodeId)
    
    // 3. 触发 onEnter 事件（如解锁证据）
    if (node.onEnter) {
      handleEvents(node.onEnter)
    }
  }
  
  // ========== 处理事件（解锁证据等） ==========
  const handleEvents = (events) => {
    if (events.unlockEvidence) {
      console.log('🔓 解锁证据:', events.unlockEvidence)
      // TODO: 调用 Zustand store 更新证据状态
    }
    if (events.refreshEvidenceList) {
      console.log('🔄 刷新证据列表')
      // TODO: 刷新证据列表
    }
  }
  
  // ========== 玩家选择回复 ==========
  const handleSelectOption = async (option) => {
    // 1. 显示玩家的回复
    addMessage('player', option.content, true)
    
    // 2. 清空当前选项（等待对方回复）
    setCurrentOptions([])
    setIsTyping(true)  // 显示"正在输入..."
    
    // 3. 模拟对方思考时间
    setTimeout(() => {
      setIsTyping(false)
      
      // 4. 跳转到下一个节点
      if (option.nextNode) {
        displayNode(option.nextNode)
      } else {
        // 对话结束
        setCurrentOptions([])
      }
      
      // 5. 触发 effect
      if (option.effect) {
        handleEvents(option.effect)
      }
    }, 500)  // 0.5秒延迟，模拟打字
  }
  
  // ========== 初始化对话 ==========
  useEffect(() => {
    if (contactId) {
      // 清空旧消息
      setMessages([])
      
      // 获取对话起始节点
      const startNode = getDialogueStart(contactId)
      if (startNode) {
        displayNode('start')
      } else {
        // 没有对话数据时的默认消息
        addMessage(contactId, [{ type: 'text', value: '暂无对话内容' }], false)
      }
    }
  }, [contactId])
  
  // ========== 渲染单条消息内容 ==========
  const renderContent = (content) => {
    return content.map((item, idx) => {
      if (item.type === 'text') {
        return <p key={idx} className="text-sm">{item.value}</p>
      } else if (item.type === 'image') {
        return (
          <img 
            key={idx} 
            src={item.value} 
            alt="图片"
            className="max-w-[200px] max-h-[200px] rounded-lg mt-1"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )
      }
      return null
    })
  }
  
  // ========== 渲染 ==========
  return (
    <div className="h-full flex flex-col">
      {/* 聊天头部 */}
      <div className="bg-gray-100 p-3 border-b flex items-center gap-3">
        <button onClick={onBack} className="text-blue-500 text-xl">
          ←
        </button>
        <img 
          src={character?.avatar} 
          alt={character?.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="font-medium">{character?.name}</div>
      </div>
      
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex ${msg.speaker === 'player' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-2 ${
                msg.speaker === 'player' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {renderContent(msg.content)}
              <div className={`text-xs mt-1 ${msg.speaker === 'player' ? 'text-blue-200' : 'text-gray-500'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        
        {/* 正在输入提示 */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-2">
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 选项按钮区 */}
      {currentOptions.length > 0 && (
        <div className="border-t p-3 space-y-2 bg-gray-50">
          {currentOptions.map((option, idx) => (
            <button
              key={idx}
              className="w-full text-left p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors text-sm"
              onClick={() => handleSelectOption(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}