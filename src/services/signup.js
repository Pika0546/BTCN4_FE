import { makeRequest } from "../lib/api"
import { HTTPMethod } from "../lib/common"

export const createAccount = async ({
    username,
    password
}) => {
    return makeRequest(HTTPMethod.POST, "", {username, password})
}