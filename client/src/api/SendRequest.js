//import { response } from "express";

function checkStatus(response) {
    if(response.ok || response.status === 204) {
        return response;
    }
    return Promise.reject({});
}

export default function sendRequest (options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(checkStatus)
        .then(
            response => {
                if(response.status === 204){
                    return "{}";
                }
                return response.json();
            }
        )
};