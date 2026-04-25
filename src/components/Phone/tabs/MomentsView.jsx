// src/components/Phone/tabs/MomentsView.jsx
import React, { useState, useEffect } from 'react'
import { getMomentByKeyword, getFriendMoments, addMomentAuthor } from '/src/data/moments/index.js'
import { getCharacterById } from '/src/data/characters.js'

export default function MomentsView({ onOpenChat }) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [error, setError] = useState('')
    const [added, setAdded] = useState(false)
    const [friendMoments, setFriendMoments] = useState([])

    // 加载好友帖子
    useEffect(() => {
        loadFriendMoments()
    }, [])

    const loadFriendMoments = () => {
        const moments = getFriendMoments()
        if (moments && moments.length > 0) {
            setFriendMoments(moments)
        } else {
            setFriendMoments([])
        }
    }

    // 搜索帖子
    const handleSearch = () => {
        setError('')
        setSearchResult(null)
        setAdded(false)

        if (!searchInput.trim()) {
            setError('请输入关键词')
            return
        }

        let found = getMomentByKeyword(searchInput)

        if (!found) {
            setError('未找到相关帖子')
            return
        }

        setSearchResult(found)
    }

    // 重置搜索
    const handleReset = () => {
        setSearchInput('')
        setSearchResult(null)
        setError('')
        setAdded(false)
        loadFriendMoments()
    }
    
    // 添加发布者为好友
    const handleAddFriend = () => {
        if (searchResult && searchResult.authorId) {
            const success = addMomentAuthor(searchResult.authorId)
            if (success) {
                setAdded(true)
                loadFriendMoments()
            }
        }
    }

    // 获取评论者的名称
    const getCommenterName = (userId) => {
        const character = getCharacterById(userId)
        return character ? character.name : userId
    }

    const checkIsFriend = (authorId) => {
        const character = getCharacterById(authorId)
        return character ? character.isAdd : false
    }

    // 渲染评论区域
    const renderComments = (comments) => {
        if (!comments || comments.length === 0) {
            return null
        }

        return (
            <div className="mt-3 bg-teal-100 rounded-lg p-3">
                {comments.map((comment, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                        <div className="text-sm">
                            <span className="font-medium text-teal-900">
                                {getCommenterName(comment.userId)}
                            </span>
                            {comment.replyTo && (
                                <span className="text-gray-500"> 回复 </span>
                            )}
                            {comment.replyTo && (
                                <span className="font-medium text-teal-800">
                                    {getCommenterName(comment.replyTo)}
                                </span>
                            )}
                            <span className="text-teal-500">:  </span>
                            <span className="text-black-700">
                                {renderCommentContent(comment.content)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // 渲染评论内容（支持文本和图片）
    const renderCommentContent = (content) => {
        if (!content) return null
        
        return content.map((item, idx) => {
            if (item.type === 'text') {
                return <span key={idx}>{item.value}</span>
            } else if (item.type === 'image') {
                return (
                    <img 
                        key={idx}
                        src={item.value}
                        alt="评论图片"
                        className="inline-block max-w-[100px] max-h-[100px] rounded-lg mt-1"
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                )
            }
            return null
        })
    }

    // 渲染点赞区域
    const renderLikes = (likes) => {
        if (!likes || likes.length === 0) {
            return null
        }

        const likeUsers = likes.map(userId => getCommenterName(userId)).join('、')

        return (
            <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                <span>❤️</span>
                <span>{likeUsers}</span>
            </div>
        )
    }

    // 渲染单个帖子
    const renderMoment = (moment, isSearchResult = false) => {
         const isFriend = checkIsFriend(moment.authorId)
    console.log('作者ID:', moment.authorId, '是否是好友:', isFriend, 'added状态:', added)
        const shouldShowAddButton = isSearchResult && !added && !checkIsFriend(moment.authorId)
        
        return (
            <div key={moment.id} className="border-b p-4 ">
                <div className="flex gap-3">
                    {/* 头像 */}
                    <img 
                        src={moment.authorAvatar || '/default-avatar.png'} 
                        alt={moment.authorName}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onError={(e) => { e.target.src = '/default-avatar.png' }}
                    />
                    <div className="flex-1">
                        {moment.authorName}
                        {/* 关键词标签 */}
                        {moment.keyword && (
                            <div className="mt-1">
                                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                                    #{moment.keyword}
                                </span>
                            </div>
                        )}
                        
                        {/* 帖子内容 */}
                        <div className="mt-2 text-gray-700">
                            {moment.content}
                        </div>
                        
                        {/* 帖子图片 */}
                        {moment.images && moment.images.length > 0 && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                                {moment.images.map((img, idx) => (
                                    <img 
                                        key={idx}
                                        src={img}
                                        alt=""
                                        className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                        onClick={() => window.open(img, '_blank')}
                                        onError={(e) => { e.target.src = '/placeholder.png' }}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="text-xs text-gray-400  mt-5">
                                {moment.time}
                        </div>
                        {/* 点赞区域 */}
                        {renderLikes(moment.likes)}
                        
                        {/* 评论区域 */}
                        {renderComments(moment.comments)}
                        
                        {/* 时间和操作 */}
                        <div className="mt-2 flex justify-between items-center">
                            {shouldShowAddButton &&  (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddFriend}
                                        className="text-xs text-teal-500 hover:text-teal-700"
                                    >
                                        添加好友
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            {/* 头部 */}
            <div className="bg-gray-100 p-4 border-b">
                <h2 className="text-lg font-bold">朋友圈</h2>
                <p className="text-sm text-gray-500 mt-1">默认显示好友帖子，搜索获取非好友帖子</p>
            </div>
            
            {/* 搜索区域 */}
            <div className="p-4 border-b">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="输入关键词搜索帖子..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        搜索
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        取消
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>
            
            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto">
                {/* 搜索结果 */}
                {searchResult && !added && (
                    <div className="p-2">
                        <div className="bg-teal-50 rounded-lg mb-2 p-2">
                            <h3 className="text-sm font-medium text-teal-700">搜索结果：</h3>
                        </div>
                        {renderMoment(searchResult, true)}
                    </div>
                )}
                
                {/* 已添加成功提示 */}
                {searchResult && added && (
                    <div className="p-4 text-center text-green-500">
                        已成功添加 {searchResult.authorName} 为好友！
                    </div>
                )}
                
                {/* 好友帖子列表 */}
                {!searchResult && (
                    <div>
                        {friendMoments.length === 0 ? (
                            <div className="text-center text-gray-400 mt-20">
                                暂无好友帖子
                            </div>
                        ) : (
                            friendMoments.map(moment => renderMoment(moment, false))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}