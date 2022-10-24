import { API_URL } from "../config";
import { makeRequest } from "../lib/api"
import { HTTPMethod } from "../lib/common"

export const getAccountList = async () => {
    return makeRequest(HTTPMethod.GET, `${API_URL}/account`)
}