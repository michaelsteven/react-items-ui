const sendRequest = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(
            response =>
                response.json()
                    .then(
                        json => {
                            if (!response.ok) {
                                return Promise.reject(json)
                            }
                            return json;
                        }
                    )
        )
};

export function checkHealth(){
    return sendRequest({
       url: "/health",
        method: 'GET'
    });
}

export function getHttpTraces(){
    return sendRequest({
        url: "/httptrace",
        method: 'GET'
    });
}


export function getPageItems(pageable){

    if(pageable){
        return sendRequest({
            url: "/api/v1/items?page=" + pageable.page,
            method: 'GET'
        });
    } else {
        return sendRequest({
            url: "/api/v1/items?page=0",
            method: 'GET'
        });
    }

}