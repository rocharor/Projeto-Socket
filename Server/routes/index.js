var express = require('express');
var router = express.Router();

var channel_1 = {
    channelName: 'Canal 1',
    title: 'Coruja Branca',
    description: 'Coruja bla bla bla',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_gaAbFtx6uWUcShrk4GyIE6o7hRrZHVskF49b5USNcQa1NPvBkQ',
    statusSocket: 1,
    comments: []
}
var channel_2 = {
    channelName: 'Canal 2',
    title: 'Coruja Marron',
    description: 'Coruja bla bla bla',
    image: 'https://d31j74p4lpxrfp.cloudfront.net/sites/default/files/styles/mobile_large_image/public/br_files/14299203183_c619e5e392_o.jpg?itok=S_212kWw',
    statusSocket: 1,
    comments: []
}

function indexRouter(dependencies) {
    const { io } = dependencies

    io.on('connect', function (socket) {
        console.log('Um novo cliente se conectou - ID => ' + socket.id);

        socket.on('join', (channelId) => {
            if (channelId < 3) {
                var key = mountKey(channelId)
                socket.join(key);
                socket.emit('setDataChannel', eval(key))
            }
        })
        socket.on('send', () => {
            console.log('send')
        })

        socket.on('disconnect', () => {
            console.log('Cliente desconectou - ID => ' + socket.id)
        })
    })

    router.get('/', function (req, res, next) {
        res.send({ ok: true })
    });

    router.post('/sendComment', function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', '*')
        var key = mountKey(req.body.channel)
        var channel = eval(key)
        channel.comments.push(req.body.item)
        io.in(key).emit('getComment', channel.comments)
        res.send()
    });

    router.post('/alterNameChannel', function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', '*')
        var key = mountKey(req.body.channel)
        var channel = eval(key)
        channel.channelName = req.body.nameChannel
        io.in(key).emit('alterNameChannel', channel.channelName)
        res.send()
    });

    router.post('/alterImage', function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', '*')
        var key = mountKey(req.body.channel)
        var channel = eval(key)
        channel.image = req.body.image
        io.in(key).emit('alterImage', req.body.image)
        res.send()
    });

    router.post('/alterTitle', function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', '*')
        var key = mountKey(req.body.channel)
        var channel = eval(key)
        channel.title = req.body.title
        io.in(key).emit('alterTitle', channel.title)
        res.send()
    });

    router.post('/alterDescription', function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', '*')
        var key = mountKey(req.body.channel)
        var channel = eval(key)
        channel.description = req.body.description
        io.in(key).emit('alterDescription', channel.description)
        res.send()
    });

    return router
}

module.exports = indexRouter;

function mountKey(channel) {
    return "channel_" + channel
}
// // enviar apenas para o cliente atual
// client.emit('message', "this is a test");

// // enviar para todos os clientes, inclusive o atual
// io.emit('message', "this is a test");

// // enviar para todos os clientes, exceto o atual
// client.broadcast.emit('message', "this is a test");

// // enviar para todos os clientes (com exceção do atual) para uma sala específica
// socket.broadcast.to('game').emit('message', 'nice game');

// // enviar para todos os clientes em uma sala específica
// io.in('game').emit('message', 'cool game');

// // enviar para o atual, caso ele esteja na sala
// client.to('game').emit('message', 'enjoy the game');

// // enviar para todos os clientes em um namespace 'namespace1'
// io.of('namespace1').emit('message', 'gg');

// // enviando para um socketid individual
// client.broadcast.to(socketid).emit('message', 'for your eyes only');
