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
            url: "/api/v1/items?page=" + (pageable.pageNumber) + "&size=" + (pageable.pageSize),
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
    alert("In editItem:" + JSON.stringify(item));
    if(item){
        return sendRequest({
            url: "/api/v1/items/" + item.id,
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
        url: "/api/v1/items/" + id,
        method: 'delete'
    });
}