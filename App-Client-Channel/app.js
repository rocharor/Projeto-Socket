const app = new Vue({
    el: '#app',
    data: {
        channelId: 0,
        channelName: '',
        title: '',
        description: '',
        image: '',
        statusSocket: 0,
        comment: '',
        comments: []
    },
    methods: {
        send: function () {
            axios.post('http://192.168.40.229:3000/sendComment', {
                'channel': app.channelId,
                'item': app.comment
            }).then(function (response) {
                app.comment = ''
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted: function () {
        var query = getQueryString()
        if (query.channel != null) {
            this.channelId = query.channel
        }

        document.getElementById('app').classList.remove("d-none")
    }
})

var ip = '192.168.40.229'

socket = io('http://' + ip + ':3000/')

socket.on('connect', function () {
    console.log('Conectou no Socket')
    socket.emit('join', app.channelId)
    socket.on('setDataChannel', function (data) {
        console.log('Recebeu dados Padrao')
        app.channelName = data.channelName
        app.title = data.title
        app.lastName = data.lastName
        app.description = data.description
        app.image = data.image
        app.statusSocket = data.statusSocket
        app.comments = data.comments
    })

    socket.on('getComment', function (data) {
        console.log('alterou o comentario')
        app.comments = data
    })

    socket.on('alterImage', function (data) {
        console.log('alterou o imagem')
        app.image = data
    })

    socket.on('alterNameChannel', function (data) {
        console.log('alterou o nome do canal')
        app.channelName = data
    })

    socket.on('alterTitle', function (data) {
        console.log('alterou o titulo')
        app.title = data
    })

    socket.on('alterDescription', function (data) {
        console.log('alterou a descrição')
        app.description = data
    })
})

socket.on('disconnect', function () {
    app.statusSocket = 0
})


function getQueryString(){
	var query = location.search.slice(1);
	var partes = query.split('&');
	var data = {};

	partes.forEach(function (parte) {
		var chaveValor = parte.split('=');
		var chave = chaveValor[0];
		var valor = chaveValor[1];
		data[chave] = valor;
	});

	return data;
}
