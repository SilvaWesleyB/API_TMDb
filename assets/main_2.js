// Variaveis 
var urlBase ='https://api.themoviedb.org/3/';
var urlImg = 'https://image.tmdb.org/t/p/';
var apiKey = "0ee05a8fe5aefee62bbcafda1e92b900";

var lDesejo = localStorage.getItem("Lista Desejo");
lDesejo =  JSON.parse(lDesejo);

var title = "";
var mostrar = "";
var i;

title += '<h1>Lista de Desejo</h1>';
document.getElementById("title").innerHTML = title;  

for (i in lDesejo) {
	var filme = JSON.parse(lDesejo[i])

	mostrar += '<div class="card" style="width: 20rem;">';
   	mostrar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w300/'+filme.poster_path+'">';
    mostrar += '<div class="card-body">';
    mostrar += '<h5>'+filme.title+'</h5>';
    mostrar += '<p class="card-text"><small class="text-muted">Sinopse: '+filme.overview+'</small></p>';
    mostrar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+filme.release_date+'</small></p>';
    mostrar += '<p class="card-text"><small class="text-muted">Média: '+filme.vote_average+'</small></p>';
    mostrar += '<input id="btnButton2" data-toggle="modal" data-target=".bd-example-modal-lg" type="button" class="btn btn-dark" value="Assistir" onClick="assistir('+filme.id+')">';
    mostrar += '<input type="button" class="btn btn-dark" value="+Informações" onClick="mais('+filme.id+')">';
    mostrar += '</div>';
    mostrar += '</div>';
}
    document.getElementById('root').innerHTML = mostrar;

function assistir(id) {
   idFilme = (id);

    //criando requisição
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            fAssistir(data.results);
        }
    };
    request.open("GET", urlBase+"movie/"+idFilme+"/videos?api_key="+apiKey+"&language=pt-BR", true);
    request.send();

    function fAssistir(film) {
        var mFrame ="";
        var i;

        for(i = 0; i < film.length; i++){
        mFrame += '<h5> '+film[i].name+'</h5>';
        mFrame += '<iframe width="760px" height="560px" src="https://www.youtube.com/embed/'+film[i].key+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }

        document.getElementById('mFramer').innerHTML = mFrame;
    }
}

function mais(id) {
    // body...
}
