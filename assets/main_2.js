// Variaveis Globais
var urlBase ='https://api.themoviedb.org/3/';
var urlImg = 'https://image.tmdb.org/t/p/';
var apiKey = "0ee05a8fe5aefee62bbcafda1e92b900";
//
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    (this.responseText);
  }
});
// Abrindo Requisição.
xhr.open("GET", urlBase+"configuration?api_key="+apiKey);
// Enviando Requisição.
xhr.send();

// Pegando Itens no Local Storage
var lDesejo = localStorage.getItem("Lista Desejo");
// Transformando o resultado
lDesejo =  JSON.parse(lDesejo);

// Caso não possua nada, exiba a informação abaixo
var indice = -1;
if(lDesejo==0){
    var vazio = "";

    vazio += '<h5>A Lista esta vazia! Nenhum Filme Pra Assistir =(</h5>';

    document.getElementById('vazio').innerHTML = vazio;
}

// Caso possua algo no Local storage, Cria um Card
var title = "";
var mostrar = "";
var i;

// Titulo
title += '<h1>Lista de Desejo</h1>';
document.getElementById("title").innerHTML = title;  
// Cards
for (i in lDesejo) {
	var filme = JSON.parse(lDesejo[i]);

	mostrar += '<div class="card" style="width: 20rem;">';
   	mostrar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w300/'+filme.poster_path+'">';
    mostrar += '<div class="card-body">';
    mostrar += '<h5>'+filme.title+'</h5>';
    mostrar += '<p class="card-text"><small class="text-muted"><strong>Sinopse:</strong> '+filme.overview+'</small></p>';
    mostrar += '<p class="card-text"><small class="text-muted"><strong>Data de Lançamento:</strong> '+filme.release_date+'</small></p>';
    mostrar += '<p class="card-text"><small class="text-muted"><strong>Média:</strong> '+filme.vote_average+'</small></p>';
    mostrar += '<input id="btnButton2" data-toggle="modal" data-target=".bd-example-modal-lg" type="button" class="btn btn-dark" value="Assistir" onClick="assistir('+filme.id+')">';
    mostrar += '<input type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-dark" value="+Informações" onClick="mais('+filme.id+')">';
    mostrar += '</div>';
    mostrar += '</div>';
}
    document.getElementById('root').innerHTML = mostrar;
 // Função do Botão assistir
function assistir(id) {
    // Pegando o ID do Filme
   idFilme = (id);
   
    // Criando requisição a partir do Id do Filme
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            fAssistir(data.results);
        }
    };
    // Abrindo Requisição.
    request.open("GET", urlBase+"movie/"+idFilme+"/videos?api_key="+apiKey+"&language=pt-BR", true);
    // Enviando Requisição.
    request.send();
    // Função após abrir Requisição, para mostar o frame
    function fAssistir(film) {
        var mFrame ="";
        var i;

        for(i = 0; i < film.length; i++){
        mFrame += '<h5> '+film[i].name+'</h5>';
        mFrame += '<iframe width="760px" height="560px" src="https://www.youtube.com/embed/'+film[i].key+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        document.getElementById('mOutros').innerHTML = mFrame;
    }

    // Função no X para remover o filme da lista e recarregar a pagina
    btnAtualizar = document.getElementById('btnFModal');
    btnAtualizar.onclick = function(){
        lDesejo.splice(indice, 1);
        localStorage.setItem("Lista Desejo", JSON.stringify(lDesejo));
        alert("Filme Assistido com Sucesso");
        document.location.href="";
    }
}

function mais(id) { 
    // Pegando o ID do Filme
    idFilme = (id);

    // Criando requisição
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            mInfo(data);
        }
    };
    // Abrindo Requisição.
    request.open("GET", urlBase+"movie/"+idFilme+"?api_key="+apiKey+"&language=pt-BR", true);
    // Enviando Requisição.
    request.send();
    // Cards
    function mInfo(film) {
        var mostrar = "";
        var produtora ="";
        var i;

        for (i = 0; i < film.production_companies.length; i++) {
            produtora += '<img src="'+urlImg+'w92/'+film.production_companies[i].logo_path+'">';
        }

        mostrar += '<img class="card-img-top" alt="Imagem não Encontrada!" src="'+urlImg+'w500/'+film.backdrop_path+'">';
        mostrar += '<h5>'+film.title+'</h5>';
        mostrar += '<p class="card-text" style="overflow: visible; white-space: normal; width: auto; text-align: justify;"><small class="text-muted"><strong>Sinopse:</strong> '+film.overview+'</small></p>';
        mostrar += '<p class="card-text"><small class="text-muted"><strong>Data de Lançamento:</strong> '+film.release_date+'</small></p>';
        mostrar += '<p class="card-text"><small class="text-muted"><strong>Média:</strong> '+film.vote_average+'</small></p>';
        mostrar += '<p class="card-text"><small class="text-muted"><strong>Produtora: </strong></small></p>'+produtora+'';

        document.getElementById("mOutros").innerHTML = mostrar;
    }

}
