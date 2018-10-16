// Variaveis 
var urlBase ="https://api.themoviedb.org/3/"
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
function weekFilmes(filme) {
    var mostar = "";
    var i;
    for(i = 0; i < filme.length; i++) {
    	mostar += '<div class="card" style="width: 15rem;">';
		mostar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w200/'+filme[i].poster_path+'">';
		mostar += '<div class="card-body">';
		mostar += '<h5 class="text-muted">'+filme[i].title+'</h5>';
		mostar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+filme[i].release_date+'</small></p>';
		mostar += '<p class="card-text"><small class="text-muted">Média: '+filme[i].vote_average+'</small></p>';
        mostar += '<button type="button" class="btn btn-dark" id="btnDesejo" onclick="info('+filme[i].id+')";>Add Lista Desejo</button>';
		mostar += '</div>';
		mostar += '</div>';
    }
    document.getElementById("root").innerHTML = mostar;
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
        var i;
        for(i = 0; i < film.length; i++) {
            mostar += '<div class="card" style="width: 15rem;">';
            mostar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w200/'+film[i].poster_path+'">';
            mostar += '<div class="card-body">';
            mostar += '<h5 class="text-muted">'+film[i].title+'</h5>';
            mostar += '<p class="card-text"><small class="text-muted">Titulo Original: '+film[i].original_title+'</small></p>'
            mostar += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+film[i].release_date+'</small></p>';
            mostar += '<p class="card-text"><small class="text-muted">Média: '+film[i].vote_average+'</small></p>';
            mostar += '<button type="button" class="btn btn-dark" id="btnDesejo" onclick="info('+film[i].id+')";>Add Lista Desejo</button>';
            mostar += '</div>';
            mostar += '</div>';
        }
        document.getElementById("root").innerHTML = mostar;
    }   
    
    // Enviando Requisição.
    request.send();
}
//___________________________________________Fim Search__________________________________________________________________________________________


// Pegando o id do Filme
function info(idFilme){
    sessionStorage.setItem("idFilme", idFilme);
}
