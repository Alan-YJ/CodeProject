export function addClass(el,name){
    let reg = new RegExp('\s*'+name);
    if(checkClassName(el,name)){
        return;
    }
    if(!reg.test(el.className)){
        let classs = el.className.split(' ');
        classs.push(name);
        el.className = classs.join(' ')
    }
}

export function removeClass(el,name){
    let classs = el.className.split(' ');
    for(let i =0;i<classs.length;i++){
        if(name==classs[i]){
            classs.splice(i,1)
        }
    }
    el.className = classs.join(' ');
}

function checkClassName(el,name){
    let classs = el.className.split(' ');
    for(let i =0;i<classs.length;i++){
        if(name==classs[i]){
            return true
        }
    }
    return false
}