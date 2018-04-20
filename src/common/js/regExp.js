//登陆注册用的注册表验证
export function enterPhoneNum(letter){
    let reg = new RegExp(/[\d]/);
    return reg.test(letter)?letter:''
}

export function checkPhone(phone){
    let reg = new RegExp(/\d{11}/);
    return reg.test(phone)
}

export function checkPwd(pwd,repwd){
    let reg = new RegExp(/^\w{6,18}$/)
    return reg.test(pwd)&&pwd==repwd
}

export function checkIdent(ident){
    let reg = new RegExp(/[a-zA-Z0-9]{6}/);
    return reg.test(ident)
}
