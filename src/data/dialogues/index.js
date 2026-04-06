//导入所有角色对话
import {jiaDialogue} from './jia.js'
//汇总成一个对象
export const dialogues={
    jia:jiaDialogue
}

//通用函数
export function getDialogueStart(id){
    const characterDialogue=dialogues[id]
    if(!characterDialogue) return null;
    return characterDialogue.start
}

export function getDialogueNode(id,nodeId){
    const chatacterDialogue=dialogues[id]
    if(!chatacterDialogue) return null
    return characterDialogue[nodeId]
}

export function hasDialogue(id){
    return !!dialogues[id]
}