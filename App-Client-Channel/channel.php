<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Teste Socket</title>
</head>

<body>
    <div class="container">
        <div id='app' class='d-none'>
            <div v-if="statusSocket" class="alert alert-success" role="alert">Conectado</div>
            <div v-else class="alert alert-danger" role="alert">Não Conectado</div>
            <h1>{{channelName}}</h1>

            <div class="row">
                <div class="col-sm-7">
                    <div class="thumbnail">
                        <img :src="image" class="card-img-top" alt="...">
                        <div class="caption">
                            <h3>{{title}}</h3>
                            <p>{{description}}</p>
                            <textarea name="" id="" cols="30" rows="5" style="width: 100%" v-model="comment"></textarea>
                            <p><button class="btn btn-primary" role="button" v-on:click="send">Comentar</button></p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5" style="border:solid 1px; overflow: auto; height: 640px">
                    <h3 align='center'>Comentarios</h3>
                    <table class='table table-striped'>
                        <tr v-for="comment in comments">
                            <td>{{comment}}</td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
        <hr>
        <p><a class="btn btn-danger btn-lg" href="./index.php" role="button">Voltar</a></p>
    </div>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js'></script>
    <script src='./app.js'></script>
</body>

</html>
