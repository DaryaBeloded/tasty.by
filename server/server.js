const app = require ('./app'); 


const port = process.env.PORT || 3000;

// systeminfo 
// 192.168.0.14
const server = app.listen (port, 'localhost', () => { 
  console.log ('Экспресс-сервер прослушивает порт' + port); 
});