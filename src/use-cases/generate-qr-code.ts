const wppconnect = require('@wppconnect-team/wppconnect');

export async function generateQrCode(){
    wppconnect
    .create({
        session: 'sessionName',
        statusFind: (statusSession:any, session:any) => {
            // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
            console.log('Status Session: ', statusSession);
            // create session wss return "serverClose" case server for close
            console.log('Session name: ', session);
        },
    })
    .then((client:any) => start(client))
    .catch((error:any) => console.log(error));

function start(client:any) {
    client.onMessage((message:any) => {
        if (message.body === 'Hello') {
            client
                .sendText(message.from, 'Hello, how I may help you?')
                .then((result:any) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro:any) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
        if(message.body === "fine"){
            client.sendText(message.from, "ok")
                .then((result:any)=>{
                    console.log(result)
                })
        }

    });
}
}