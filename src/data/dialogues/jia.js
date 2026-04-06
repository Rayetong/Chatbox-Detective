//贾警官对话数据
export const jiaDialogue={
    start:{
        content:[
            {type:'text',value:'您好，我是贾警官。'},
            {type:'text',value:'昨天发生了一起命案，前辈让我来联系您。'},
            {type:'text',value:'这是我的证件，您可以确认一下。'},
            {type:'image',value:'./public/evidenceImages/jiaIdentification.png'}
        ],
        speaker:'jia',
        options:[
            {
                text:'阿，你好',
                content:[
                    {type:'text',value:'阿，你好'}
                ],
                nextNode:'case1',
                effect:{}//触发游戏状态变化
            },
            {
                text:'说案子',
                content:[
                    {type:'text',value:'说案子'}
                ],
                nextNode:'case1',
                effect:{}//触发游戏状态变化
            },
            {
                text:'随手回疑惑的表情',
                content:[
                    {type:'image',value:'./public/emojis/question.png'}
                ],
                nextNode:'case1',
                effect:{}//触发游戏状态变化
            }
        ],
        onEnter:{unlockEvidence:'jiaIdentification'},//进入节点时触发的事件
        onExit:{refreshEvidenceList:true},
    },
    case1:{
        content:[
            {type:'text',value:'尸体在今早八点四十四分被发现在皇珠大厦大门。'},
            {type:'text',value:'据调查，死者名为甄概司，是皇珠高管的男儿。'},
            {type:'text',value:'目前各部门正在协调工作，证据还在收集中。'},
            {type:'text',value:'这次来打扰您，是想委托您协助这次案件的调查。'},
        ],
        speaker:'jia',
        options:[
            {
                text:'案件吗......',
                content:[
                    {type:'text',value:'案件吗......'}
                ],
                nextNode:'case2',
                effect:{}//触发游戏状态变化
            },
            {
                text:'听上去好麻烦。',
                content:[
                    {type:'text',value:'听上去好麻烦。'}
                ],
                nextNode:'case2',
                effect:{}//触发游戏状态变化
            },
            {
                text:'回复一个没有干劲的表情',
                content:[
                    {type:'image',value:'./public/emojis/unmotivated.png'}
                ],
                nextNode:'case2',
                effect:{}//触发游戏状态变化
            },
        ],
        onEnter:null,//进入节点时触发的事件
        onExit:null,
    },
    // 节点:{
    //     content:[
    //         {type:'',value:''},
    //     ],
    //     speaker:'jia',
    //     options:[
    //         {
    //             text:'',
    //             content:[
    //                 {type:'',value:''}
    //             ],
    //             nextNode:'',
    //             effect:{}//触发游戏状态变化
    //         },
    //     ],
    //     nextNode:'',
    //     onEnter:{unlockEvidence:''},//进入节点时触发的事件
    //     onExit:{refreshEvidenceList:true},
    // },
}
