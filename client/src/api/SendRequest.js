import Promise from 'promise';

function checkStatus(response) {
    if(response.ok || response.status === 204) {
        return response;
    }
    return Promise.reject(new Error('Invalid Response Code'));
}

function returnJson(response) {
    if(response.status === 204){
        return "{}";
    }
    return response.json();
}

export default function sendRequest (options) {
    const headers1 = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'No-Store',
    });

    const defaults = {headers: headers1};
    const options2 = Object.assign({}, defaults, options);
    return fetch(options2.url, options2)
        .then(checkStatus)
        .then(returnJson)
};