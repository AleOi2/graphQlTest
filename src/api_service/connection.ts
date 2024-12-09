import { sendConnectionInfoAPI } from "src/api/connection"

export const sendConnectionInfoService = async (token: string, connection: boolean, identifier: string, connection_qdte: number) => {
    try {
        let connectionRequest = await sendConnectionInfoAPI(token, {
            connection: connection,
            identifier: identifier,
            connection_qtde: connection_qdte
        });
        console.log("connectionRequest")
        console.log(connectionRequest)
        let result;
        if (connectionRequest.status == 200 || connectionRequest.status == 201) {
            result = connectionRequest.data;
    
        }
        return result as Promise<{msg: string} | undefined>; 
    } catch (error) {
        console.log("fetching error")        
        console.log(error)        
    }
}