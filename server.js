//----------------------------------------------------------------------------

require('dotenv').config();
let express = require('express');
let http = require('http');
let { Server } = require('socket.io');
let cors = require('cors');
//----------------------------------------------------------------------------

let app = express();
let server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //For browser debugging.
//----------------------------------------------------------------------------

let io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
//----------------------------------------------------------------------------

let masterModals = [
    { image: 'images/1.jpg', text: '------- Ishiba Shigeru -------\n---------- 自然との共生を大事にする事 ----------', password:'a',isImportant:false},
    { image: 'images/2.jpg', text: '------- Donald Trump -------\n---------- the Earth is mankind`s oldest best friend ----------', password:'a',isImportant:true},
    { image: 'images/3.jpg', text: '------- Suzuki Kenta -------\n---------- 未来の地球を支えるもの ----------', password:'a', isImportant:false},
    { image: 'images/4.jpg', text: '------- Ado -------\n---------- 歌い手にとっても、かけがえのない、すべて ----------', password:'a', isImportant:true},
    { image: 'images/5.jpg', text: '-------  -------\n----------  ----------', password:'a', isImportant:false},
    { image: 'images/6.jpg', text: '-------  -------\n----------  ----------', password:'a', isImportant:false},
    { image: 'images/7.JPG', text: '-------  -------\n----------  ----------', password:'a', isImportant:false},
    { image: 'images/', text: '',password:'a', isImportant:false},
    { image: 'images/', text: '',password:'a', isImportant:false},
    { image: 'images/', text: '',password:'a', isImportant:false}, //10
];
//----------------------------------------------------------------------------

for (let i = 0; i < 10; i++) {
    masterModals.push({
        id: i,
        text: `modal No.${i}`,
        image: `images/image_${i}.jpg`,
    });
}
//----------------------------------------------------------------------------

let availableModalIds = Array.from(Array(10).keys());
//----------------------------------------------------------------------------

//login API ete...
//----------------------------------------------------------------------------

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    socket.emit('updateGlobalCount', availableModalIds.length);
    socket.on('requestModal', (username) => {
        if(availableModalIds.length > 0) {
            let acquiredModalId = availableModalIds.shift();
            let acquiredModal = masterModals[acquiredModalId];
            console.log(`${username} is get to modal:${acquiredModalId}.`);
            socket.emit('modalAcquired', acquiredModal);
            io.emit('updateGlobalCount', availableModalIds.length);
        } else {
            socket.emit('noModalLeft');
        }
    });
    socket.on('disconnect', () => { /* ... */ });
});
//----------------------------------------------------------------------------

let port = process.env.port || 3000;
server.listen(port, () => {
    console.log(`center server port ${port} start (*^^)v`);
});
//----------------------------------------------------------------------------
