const app = require ('./app'); 


const port =  8000;

// systeminfo 
// 192.168.0.14
const server = app.listen (port, () => { 
  console.log ('Экспресс-сервер прослушивает порт ' + port); 
});