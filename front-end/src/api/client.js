import axios from "axios";
import { isFailureStatus } from "./config/status-code.config";

const client = axios.create({
    baseURL: "",
    withCredentials: true
});

export async function requestClientService(method, url) {
    try {
        let response;
        if (method === 'get') {
            response = await client.get(url);
        } else if (method === 'post') {
            response = await client.post(url);
        }
        console.log(response)
            // const response = await client({
            //     method,
            //     url,
            // })
        if (isFailureStatus(response.data.content.code)) {
            // TODO error log
            console.log("errorLog/ uri : " + url, "method: " + method)
        }
        return response.data.content
    } catch (e) {
        console.log("errorLog/ uri : " + url, "method: " + method + "message :" + e.getMessage())
    }

}
export default client;