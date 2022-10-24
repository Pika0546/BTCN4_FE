import { makeRequest } from "../lib/api"
import { HTTPMethod } from "../lib/common"

const API = process.env.REACT_APP_API_HOST;


export const getAccountList = async () => {
    console.log(`${process.env.API_HOST}/account`);
    return makeRequest(HTTPMethod.GET, `${API}/account`)
}