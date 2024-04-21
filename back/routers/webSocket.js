// // import { commandManagement } from '../commands/commandManagement.js';
// import { commandManagement } from "../controllers/commandSocketController.js";
//
// const WebSocketRouter = (ws) => {
//     console.log('WebSocket client connected yes');
//
//     ws.on('ping', (data) => {
//         console.log("Trop bien : " + data)
//     })
//
//     ws.on('message', (message) => {
//         try {
//             message = JSON.parse(message);
//             console.log("command : " + message.type)
//             if (message.type === undefined) {
//                 ws.send('Type not found');
//                 return;
//             }
//             const command = message.type.split(':')[0]
//
//             commandManagement(command, ws, message);
//
//         } catch (err) {
//             ws.send('Error parsing message');
//         }
//     });
//
//     ws.on('close', () => {
//         console.log('WebSocket client disconnected');
//     });
// }
//
// export { WebSocketRouter }