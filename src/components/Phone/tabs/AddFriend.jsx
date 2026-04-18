// src/components/Phone/AddFriend.jsx
import React, { useState } from 'react'
import { getCharacterByCode, getCharacterByNickname, addCharacterByCode, addCharacterByNickname, isFriend } from '/src/data/characters.js'

export default function AddFriend({ onOpenChat }) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [error, setError] = useState('')
    const [added, setAdded] = useState(false)

    // 搜索好友
    const handleSearch = () => {
        setError('')
        setSearchResult(null)
        setAdded(false)

        if (!searchInput.trim()) {
        setError('请输入 code 或 昵称')
        return
        }

        // 查找角色（通过 code/nickname）
        let found = getCharacterByCode(searchInput)
        if (!found) {
        found = getCharacterByNickname(searchInput)
        }

        if (!found) {
        setError('未找到该用户')
        return
        }

        if (isFriend(found.id)) {
        setError('已经是好友了')
        return
        }

        setSearchResult(found)
    }

    // 添加好友
    const handleAddFriend = () => {
        if (!searchResult) return

        // 修正：根据实际情况调用正确的添加函数
        let success = false
        if (searchResult.code) {
        success = addCharacterByCode(searchResult.code)
        } else if (searchResult.nickname) {
        success = addCharacterByNickname(searchResult.nickname)
        }

        if (success) {
        setAdded(true)
        // 可选：1秒后自动关闭提示
        setTimeout(() => {
            setAdded(false)
            setSearchResult(null)
            setSearchInput('')
        }, 2000)
        } else {
        setError('添加失败，请重试')
        }
    }

    //这个看要不要用
    const handleSendMessage = () => {
        if (searchResult && onOpenChat) {
        onOpenChat(searchResult.id)
        }
    }

    return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-lg font-bold">添加好友</h2>
        <p className="text-xs text-gray-500 mt-1">输入 Code 搜索用户</p>
      </div>
      
      {/* 搜索区域 */}
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="输入 Code 或 昵称"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            搜索
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
      
      {/* 搜索结果 */}
       {searchResult && !added && (
        <div className="p-4">
          <div className="flex items-center gap-4 p-3 border rounded-lg">
            <img 
              src={searchResult.avatar} 
              alt={searchResult.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-bold text-lg">{searchResult.name}</div>
              <div className="text-sm text-gray-500">
                Code: {searchResult.code || '无'} | 昵称: {searchResult.nickname}
              </div>
              <div className="text-xs text-gray-400 mt-1">{searchResult.signature}</div>
            </div>
            <button
              onClick={handleAddFriend}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              添加
            </button>
          </div>
        </div>
      )}
      
      {/* 添加成功提示 */}
      {added && searchResult && (
        <div className="p-4 text-center">
          <div className="bg-green-100 text-green-700 p-4 rounded-lg">
            <p>好友已添加</p>
          </div>
        </div>
      )}
    </div>
  )
}