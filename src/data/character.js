//函数
//用id找人
export function getCharacterById(id){
    return characters.find(char=>char.id===id)
}
//获取已添加的角色
export function getAddedCharacters(){
    return characters.filter(char=>char.isAdd)
}
//通过code搜索
export function getCharacterByCode(code)
{
    return characters.find(char=>char.code===code)
}
//通过code添加
export function addCharacterByCode(code){
    const character=characters.find(char=>char.code===code)
    if(character && ! character.isAdd){
        character.isAdd=true
        return true
    }
    return false
}
//检查是否为haoyou 
export function isFriend(id)
{
    const character=getCharacterById(id)
    return character?character.isAdd:false
}

//数据
export const characters=[
    {
        id:'jia',
        name:'贾警官',
        nickname:'贾警官',
        code:'jia110',
        avatar:'./public/peopleImages/jiaAvatar.png',
        portrait:'./public/peopleImages/jiaPortrait.png',
        age:25,
        gender:'女',
        signature:'没回就是在忙',
        isAdd:true,
        relationship:'同事',
        description:'警官，身上带着年轻人特有的较真。'
    },
    {
        id:'ceshi1',
        name:'测试1',
        nickname:'测试1',
        code:'ceshi1',
        avatar:'./public/peopleImages/jiaAvatar.png',
        portrait:'./public/peopleImages/jiaAvatar.png',
        age:0,
        gender:'男',
        signature:'测试一账号',
        isAdd:true,
        relationship:'',
        description:''
    },
    {
        id:'ceshi2',
        name:'测试2',
        nickname:'测试2',
        code:'ceshi2',
        avatar:'./public/peopleImages/jiaAvatar.png',
        portrait:'./public/peopleImages/jiaAvatar.png',
        age:0,
        gender:'女',
        signature:'测试二账号',
        isAdd:false,
        relationship:'',
        description:''
    },
    // {
    //     id:'',
    //     name:'',
    //     nickname:'',
    //     code:'',
    //     avatar:'',
    //     portrait:'',
    //     age:0,
    //     gender:'',
    //     signature:'',
    //     isAdd:false,
    //     relationship:'',
    //     description:''
    // },
]