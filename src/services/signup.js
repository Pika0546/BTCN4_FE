import { API_URL } from "../config"
import { makeRequest } from "../lib/api"
import { HTTPMethod } from "../lib/common"


export const createAccount = async ({
    username,
    password
}) => {
    return makeRequest(HTTPMethod.POST, `${API_URL}/account`, {username, password})
}
