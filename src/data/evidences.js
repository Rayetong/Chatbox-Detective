//函数
//获取已收集的证据
export function getCollectedEvidences(){
    return evidences.filter(ev=>ev.isCollected)
}

//获取未收集证据
export function getUncollectedEvidences(){
    return evidences.filter(ev=>!ev.isCollected)
}
//根据id获取证据
export function getEvidenceById(id){
    return evidences.find(ev=>ev.id===id)
}
//更新证据状态
export function collectEvidence(id)
{
    const evidence=getEvidenceById(id)
    if(evidence)
    {
        evidence.isCollected=true
    }
    return evidence
}
//数据
export const evidences=[
    {
        id:'jiaIdentification',
        name:'贾警官的证件',
        description:'贾警官的证件，上面有她的警号与证件照',
        source:'贾警官',//来源角色
        sourceId:'jia',//来源角色id
        isCollected:false,
        tags:['证件'],
        image:'./public/evidenceImages/jiaIdentification.png'
    },
    // {
    //     id:'',
    //     name:'',
    //     description:'',
    //     source:'',//来源角色
    //     sourceId:'',//来源角色id
    //     isCollected:false,
    //     tags:[''],
    //     image:''
    // }
]