// src/data/moments/index.js

// 导入数据
import { jiaMoments } from './jia'
import { ceshi1Moments } from './ceshi1'
import { ceshi2Moments } from './ceshi2'

import { getAddedCharacters, getCharacterById } from '/src/data/characters.js'

// 合并所有朋友圈数据
export const moments = {
    jia: jiaMoments,
    ceshi1: ceshi1Moments,
    ceshi2: ceshi2Moments,
}

// 获取某个人的所有朋友圈
export function getMoments(id) {
    return moments[id] || []
}

// 获取某个人的某条朋友圈
export function getMomentPost(id, postId) {
    const moment = moments[id]
    if (!moment) return null
    return moment.find(post => post.id === postId) || null
}

// 根据关键词搜索帖子（搜索 keyword 字段）
export function getMomentByKeyword(keyword) {
    // 遍历所有角色的朋友圈
    for (const [authorId, posts] of Object.entries(moments)) {
        // 遍历该角色的每条帖子
        for (const post of posts) {
            // 在 keyword 字段中搜索关键词
            if (post.keyword && post.keyword.includes(keyword)) {
                // 获取作者信息
                const author = getCharacterById(authorId)
                
                // 返回格式化的数据
                return {
                    id: post.id,
                    authorId: post.authorId,
                    authorName: author ? author.name : authorId,
                    authorAvatar: author ? author.avatar : `/avatars/${authorId}.jpg`,
                    keyword: post.keyword,
                    content: post.content,
                    images: post.images || [],
                    publishTime: post.publishTime,
                    time: formatTime(post.publishTime),
                    likes: post.likes || [],
                    comments: post.comments || []
                }
            }
        }
    }
    return null
}

// 格式化时间显示（直接显示日期）
function formatTime(publishTime) {
    if (!publishTime) return '未知时间'
    const date = new Date(publishTime)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 获取好友朋友圈（返回扁平化的帖子列表）
export function getFriendMoments() {
    // 获取好友列表（isAdd = true 的角色）
    const friends = getAddedCharacters()
    
    // 收集所有好友的帖子
    const allMoments = []
    
    friends.forEach(friend => {
        const friendPosts = moments[friend.id] || []
        // 将每个帖子转换为组件期望的格式
        friendPosts.forEach(post => {
            allMoments.push({
                id: post.id,
                authorId: post.authorId,
                authorName: friend.name,
                authorAvatar: friend.avatar,
                keyword: post.keyword,
                content: post.content,
                images: post.images || [],
                publishTime: post.publishTime,
                time: formatTime(post.publishTime),
                likes: post.likes || [],
                comments: post.comments || []
            })
        })
    })
    
    // 按发布时间排序（最新的在前）
    return allMoments.sort((a, b) => {
        return new Date(b.publishTime) - new Date(a.publishTime)
    })
}

// 添加帖子作者为好友
export function addMomentAuthor(authorId) {
    // 获取作者信息
    const author = getCharacterById(authorId)
    
    if (!author) {
        console.log('未找到该用户:', authorId)
        return false
    }
    
    // 检查是否已经是好友
    if (author.isAdd) {
        console.log('已经是好友了:', author.name)
        return false
    }
    
    // 添加为好友
    author.isAdd = true
    console.log('添加好友成功:', author.name)
    return true
}