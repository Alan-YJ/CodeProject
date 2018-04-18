export const user = state => state.user
export const myLinks = state => {
    if(sessionStorage.getItem('user')!=undefined){
        return state.myLinks
    }else{
        return []
    }
}
export const imgList = state=>state.imgList
export const navList = state=>state.navList