import { makeRequest } from "../lib/api"
import { HTTPMethod } from "../lib/common"

const API = process.env.REACT_APP_API_HOST;

export const createAccount = async ({
    username,
    password
}) => {
    return makeRequest(HTTPMethod.POST, `${API}/account`, {username, password})
}
