// Variaveis 
var urlBase ='https://api.themoviedb.org/3/';
var urlImg = 'https://image.tmdb.org/t/p/';
var apiKey = "0ee05a8fe5aefee62bbcafda1e92b900";

// Requisição Week/Movie pelo XMLHttp 
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        weekFilmes(data.results);
    }
};
request.open("GET", urlBase+"trending/movie/week?api_key="+apiKey, true);
request.send();

//Função após resposta XMLHttp
function weekFilmes(film) {
    var mostar = "";
    var title = "";
    var i;

    title += '<h1>Filmes Em Alta</h1>';

    for(i = 0; i < film.length; i++) {
    	mostar += '<div class="card" style="width: 15rem;">';
		mostar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w200/'+film[i].poster_path+'">';
		mostar += '<div class="card-body">';
		mostar += '<h5 class="text-muted" id="titulo">'+film[i].title+'</h5>';
        mostar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+film[i].overview+'</small></p>';
		mostar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+film[i].release_date+'</small></p>';
		mostar += '<p class="card-text"><small class="text-muted">Média: '+film[i].vote_average+'</small></p>';
        mostar += '<input type="button" class="btn btn-dark" value="Add Lista Desejo" onClick="filme('+film[i].id+')">';
		mostar += '</div>';
		mostar += '</div>';
    }
    document.getElementById("root").innerHTML = mostar;
    document.getElementById("title").innerHTML = title;
}
//__________________________________________Fim Week___________________________________________________________________________________

// Variavel que pega o Botao.
var pPesquisa = document.getElementById("pPesquisa");

// Adicionado a função onclick no Botão, pegando o valor digitado no Form.
pPesquisa.onclick = function () {

    // Pegadno Value
    var pValue = document.getElementById("pValue").value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            mPesquisa(data.results);
        }
    };

    // Abrindo Requisição.
    request.open("GET", urlBase+'search/movie?api_key='+apiKey+'&query='+pValue, true);

    // Add a função de Submit no Form.
    document.getElementById('form').addEventListener('submit', pesquisarFilmes);

    // Função Pesquisa.
    function pesquisarFilmes(e){
        //console.log(e);
        e.preventDefault();
    }

    // Mostrando o resultado da busca.
    function mPesquisa(film){
        var mostar = "";
        var title = "";
        var i;

        title += '<h1>Resultado da Pesquisa</h1>';

        for(i = 0; i < film.length; i++) {
            mostar += '<div class="card" style="width: 15rem;">';
            mostar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w200/'+film[i].poster_path+'">';
            mostar += '<div class="card-body">';
            mostar += '<h5 class="text-muted" id="titulo">'+film[i].title+'</h5>';
            mostar += '<p class="card-text"><small class="text-muted">Titulo Original: '+film[i].original_title+'</small></p>'
            mostar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+film[i].overview+'</small></p>';
            mostar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+film[i].release_date+'</small></p>';
            mostar += '<p class="card-text"><small class="text-muted">Média: '+film[i].vote_average+'</small></p>';
            mostar += '<input type="button" class="btn btn-dark" value="Add Lista Desejo" onClick="filme('+film[i].id+')">';
            mostar += '</div>';
            mostar += '</div>';
        }
        document.getElementById("root").innerHTML = mostar;
        document.getElementById("title").innerHTML = title;      
    }
    // Enviando Requisição.
    request.send();
}
//___________________________________________Fim Search__________________________________________________________________________________________

function filme(id) {
    idFilme = (id);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            Adicionar(data);
        }
    };
    request.open("GET", urlBase+"movie/"+idFilme+"?api_key="+apiKey, true);
    request.send();
    
function Adicionar(film) {
    var listDesejo = [];
    listDesejo = localStorage.getItem("Lista Desejo");
    listDesejo = JSON.parse(listDesejo);
    if (listDesejo == null) {
        listDesejo = [];
    }
    var filme = JSON.stringify({
        id: film.id,
        title: film.title,
        poster_path: film.poster_path,
        original_title: film.original_title,
        release_date: film.release_date,
        overview: film.overview,
        vote_average: film.vote_average
    });
    listDesejo.push(filme);
    localStorage.setItem("Lista Desejo", JSON.stringify(listDesejo));
    alert("Filme Adicionado a lista de Desejo");
    return true;
  }
}