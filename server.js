const express = require('express');        /*Подключили экспресс */

const app = express();          /*Сщздали экспресс приложение */
const server = require('http').Server(app);             /*Создали http server */
const io = require('socket.io')(server);               /*Создали сокеты */

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const {roomId, userName} = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(roomId,
       new Map([
      ['users', new Map()],
      ['messages', []],
    ]));
  }
  res.send();
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Сервер запущен!');
});
