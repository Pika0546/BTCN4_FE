import { HTTPMethod } from "./common"
import queryString from 'query-string'
export const makeRequest = async (method, url, data) => {
    if(method === HTTPMethod.GET || method === HTTPMethod.DELETE){
        return await(await fetch(`${url}?${queryString.stringify(data)}`, {
            method: method,
        })).json();
    }
    else{
        return await(await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })).json();
    }
    
}