let Fetcher = (method = 'GET', path, body = {})=>{
    if(method === 'POST' || method === 'PUT'){
        body = JSON.stringify(body);
    }

    return fetch(path,body).then(response => response.json()).then(res => res)
}

export default Fetcher