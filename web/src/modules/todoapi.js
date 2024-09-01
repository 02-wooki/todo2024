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


export { getlist };