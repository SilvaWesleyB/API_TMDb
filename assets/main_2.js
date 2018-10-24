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
   	mostrar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w500/'+filme.poster_path+'">';
    mostrar += '<div class="card-body">';
    mostrar += '<h5 class="text-muted" >'+filme.title+'</h5>';
    mostrar += '<p class="card-text"><small class="text-muted">Titulo Original: '+filme.original_title+'</small></p>'
    mostrar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+filme.overview+'</small></p>';
    mostrar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+filme.release_date+'</small></p>';
    mostrar += '<p class="card-text"><small class="text-muted">Média: '+filme.vote_average+'</small></p>';
    mostrar += '<input type="button" class="btn btn-dark" value="Assistir" onClick="">';
    mostrar += '</div>';
    mostrar += '</div>';
}
    document.getElementById('root').innerHTML = mostrar;