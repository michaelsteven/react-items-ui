function checkStatus(response) {
    if(response.ok || response.status === 204) {
        return response;
    }
    return Promise.reject({});
}

function returnJson(response) {
    if(response.status === 204){
        return "{}";
    }
    return response.json();
}

export default function sendRequest (options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(checkStatus)
        .then(returnJson)
};