const { contextBridge, ipcRenderer } = require('electron');

//Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

contextBridge.exposeInMainWorld( 
    "api", {
        send: (channel, data) => {
            //whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                console.log(data);
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            ipcRenderer.on("cpu", (event, data) => {
                document.getElementById('cpu').innerHTML = data.toFixed(2);
            });
            ipcRenderer.on("mem", (event, data) => {
                document.getElementById('mem').innerHTML = data.toFixed(2);
            });
            ipcRenderer.on("totalmem", (event, data) => {
                document.getElementById('totalmem').innerHTML = data.toFixed(2);
            });
            }
        }
)