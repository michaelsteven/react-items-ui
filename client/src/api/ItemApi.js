import sendRequest from "./SendRequest";

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
            url: "/api/v1/items?page=".concat(pageable.pageNumber,"&size=",pageable.pageSize,"&sort=",pageable.sort),
            method: 'GET'
        });
    } else {
        return sendRequest({
            url: "/api/v1/items?page=0",
            method: 'GET'
        });
    }
}


export function addItem(item){
    if(item){
        return sendRequest({
            url: "/api/v1/items",
            method: 'post',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}


export function editItem(item){
    if(item){
        return sendRequest({
            url: "/api/v1/items/".concat(item.id),
            method: 'put',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

export function deleteItem(id){
    return sendRequest({
        url: "/api/v1/items/".concat(id),
        method: 'delete'
    });
}