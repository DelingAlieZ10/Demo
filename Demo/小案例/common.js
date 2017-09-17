/**
 * Created by dl151 on 0011 2017.05.11.
 */
function id(id){
    return document.getElementById(id);
}
function getText(ele){
    if(typeof ele.textContent== "string"){
        return ele.textContent;
    }else{
        return ele.innerText;
    }
}
function setText(ele,text){
    if(typeof ele.textContent == "string"){
        ele.textContent = text;
    }else{
        ele.innerText = text;
    }
}

//兼容   获取下一个相邻的兄弟姊妹元素节点
function getNextES (ele){
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }else{
        var node = ele.nextSibling;
        while(node.nodeType !=1){
            node = node.nextSibling;
        }
        return node;
    }
}

// 兼容   获取上一个相邻的兄弟姊妹元素节点
function getPreviousES (ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }else{
        var node = ele.previousSibling;
        while(node.nodeType != 1){
            node = node.previousSibling;
        }
        return node;
    }
}

//兼容   获取第一个元素节点
function getFirstEC(ele){
    if(ele.firstElementChild){
        return ele.firstElementChild;
    }else{
        var node = ele.firstChild;
        while(node.nodeType != 1){
            node =node.nextSibling;
        }
        return node;
    }
}

//兼容  获取最后一个元素节点
function getLastES(ele){
    if(ele.lastElementChild){
        return ele.lastElementChild;
    }else{
        var node = ele.lastChild;
        while(node.nodeType !=1){
            node = node.previousSibling;
        }
        return node;
    }
}