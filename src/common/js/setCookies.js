
export function setCookie(name,value,days){   /**添加设置cookie**/  
    var name = escape(name);  
    var value = escape(value);  
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + _expires;  
}  

export function getCookie(name){
    if (document.cookie.length>0){
        let c_start=document.cookie.indexOf(name + "=")
        if (c_start!=-1){ 
            c_start=c_start + name.length+1 
            let c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}

export function clearCookie(name) {  
    setCookie(name, "", -1);  
}  

export function checkCookie(){
    let tonken =getCookie('user')
    if (tonken!=null && tonken!=""){
        return true
    }else{
        return false
    }
}