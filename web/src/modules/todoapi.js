import apiUrl from "../apiurl";

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


export { getlist, removelist, recoverylist, checkboxmodify };