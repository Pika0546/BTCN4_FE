import { makeRequest } from "../lib/api"
import { HTTPMethod } from "../lib/common"

export const createAccount = async ({
    username,
    password
}) => {
    return makeRequest(HTTPMethod.POST, "http://localhost:3030/account", {username, password})
}


export const getAccountList = async () => {
    return makeRequest(HTTPMethod.GET, "http://localhost:3030/account")
}