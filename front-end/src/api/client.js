import axios from "axios";
import { isFailureStatus } from "./config/status-code.config";

const client = axios.create({
    baseURL: "",
    withCredentials: true
});

export async function requestClientService (method, url, data) {
    try {

        const response = await client({
            method,
            url,
        })
        if (isFailureStatus(response.data.content.code)) {
            // TODO error log
            // errorLog("uri : " + uri, "method: " + method);
        }
        return response.data.content
    } catch (e) {
        // errorLog("uri : " + uri, "method: " + method + "message :" + e.getMessage());
    }

}
export default client;