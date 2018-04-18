//解决返回字符串文件编码导致不能转换成json对象问题
export function parseCode(res){
    let firstCode = res.charCodeAt(0);
    if(firstCode<0x20||firstCode>0x7f){
        return res.substring(1);
    }
}