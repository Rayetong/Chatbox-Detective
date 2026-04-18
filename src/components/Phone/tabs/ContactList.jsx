// src/components/Phone/ContactList.jsx
import React from 'react'
import { getAddedCharacters } from '/src/data/characters.js'

export default function ContactList({ onOpenChat }) {
  const contacts = getAddedCharacters()

  return (
    <div className="h-full flex flex-col">
      
      {/* 联系人列表 */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map(contact => (
          <div 
            key={contact.id}
            className="flex items-center gap-3 p-3 border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => onOpenChat(contact.id)}
          >
            {/* 头像 */}
            <img 
              src={contact.avatar} 
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/48' }}
            />
            
            {/* 信息 */}
            <div className="flex-1">
              <div className="font-medium">{contact.nickname}({contact.name})</div>
              <div className="text-xs text-gray-500">
                {contact.nickname || contact.signature || '这个人很懒'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}