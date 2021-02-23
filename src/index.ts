import server from './config/server';

const port = 3000;

server.listen(port, () => {
    console.log('The game is ON!!!');
    console.log('Using port: ', port)
})