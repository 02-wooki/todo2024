import apiUrl from "../apiurl";

// [get] 데이터 요청
const getlist = async () => {
    var content;

    await fetch(`${apiUrl}/api/getlist?id=all`)
        .then(res => res.json())
        .then(res => {
            if (res.body.status === 'OK')
                content = res.body.content;
        });
    
    return content;
}

// [delete] 삭제
const removelist = async (id) => {

    var content;

    await fetch(`${apiUrl}/api/removelist/book?id=${id}`, { method : 'DELETE' })
        .then(res => res.json())
        .then(res => {
            if (res.body.status === 'OK')
                content = res.body.content;
        });

    return content;
}

// [get] 삭제 취소
const recoverylist = async () => {
    
    var content;
    
    await fetch(`${apiUrl}/api/recovery`)
        .then(res => res.json())
        .then(res => {
            if (res.body.status === 'OK')
                content = res.body.content;
        });

    return content;
}

// [patch] 체크 상태 변경
const checkboxmodify = async (id, checkstatus) => {
    
    var content;

    await fetch(`${apiUrl}/api/patchlist/checkbox?id=${id}&status=${checkstatus}`, { method : 'PATCH' })
        .then(res => res.json())
        .then(res => {
            if (res.body.status === 'OK')
                content = res.body.content;
        });

    return content;
}

// [post] 삽입
const addlist = async (newContent) => {
    var content;

    await fetch(`${apiUrl}/api/addlist`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ content: newContent })
    })
        .then(res => res.json())
        .then(res => {
            if (res.body.status === 'OK')
                content = res.body.content;
        });

    return content;
}

// [patch] 내용 변경
const contentmodify = async (id, newContent) => {
    
    var content;
    
    await fetch(`${apiUrl}/api/patchlist/content?id=${id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ content : newContent})
    })
        .then(res => res.json())
        .then(res => {
            if (res.body.status === 'OK')
                content = res.body.content;
        });

    return content;
}


export { getlist, removelist, recoverylist, checkboxmodify, addlist, contentmodify };