import axios from "axios"

export const sendConnectionInfoAPI = (token: string, {connection, identifier, connection_qtde}: {
    identifier: string,
    connection: boolean,
    connection_qtde: number
}, ) => {
    console.log('Verifcando env');
    console.log(`${process.env['CORE_ASYNC_SERVER_URL']}tugboat/connection`);
    console.log(token);
    console.log(connection);
    console.log(identifier);
    console.log(connection_qtde);
    return axios({
        method: 'post',
        url: `${process.env['CORE_ASYNC_SERVER_URL']}tugboat/connection`,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            connection: connection,
            identifier: identifier,
            connection_qtde: connection_qtde
        }
      });
}