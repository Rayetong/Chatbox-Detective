//导入数据
import {jiaMoments} from './jia'

//合并
export const moments={
    jia:jiaMoments,
}

//通用函数
export function getMoments(id){
    return moments[id]||null
}

export function getMomentPost(id,postId)
{
    const moment=moments[id]
    if(!moment) return null
    return moment[postId]||null
}