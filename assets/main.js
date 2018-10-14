//Variaveis para utilização
var API_key = '0ee05a8fe5aefee62bbcafda1e92b900';
var Base_URL = 'https://api.themoviedb.org/3/';
var Base_IMG = 'https://image.tmdb.org/t/p/';

//Pegar Formulario ao clicar no botão de Pesquisar
document.getElementById('form').addEventListener('submit', pesquisarFilmes);

//função de pegar o valor da pesquisa
function pesquisarFilmes(e){
	var pesquisarFilme = document.getElementById("pesquisarFilme").value;
	buscarFilmes(pesquisarFilme);
	console.log(e);
	e.preventDefault();
}

//Função realizando pesquisa e mostrando no html.
function buscarFilmes(pesquisarFilme){
	axios.get(Base_URL+'search/movie?api_key='+API_key+'&query='+pesquisarFilme)
		.then(function(response){
		console.log(response);
		var nomeFilme  =  response.data.results;
		var cardFilme = '';
		var buscaTitle = '';
		console.log(nomeFilme);

		//criando Titulo
		buscaTitle += '<h1> Resultado da Busca </h1>';

		//Card dos Filmes
		for (var i = 0; i < nomeFilme.length; i++) {
			cardFilme += '<div class="card" style="width: 15rem;">';
			cardFilme += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+Base_IMG+'w200/'+nomeFilme[i].poster_path+'">';
			cardFilme += '<div class="card-body">';
			cardFilme += '<h5 class="text-muted">'+nomeFilme[i].title+'</h5>';
			cardFilme += '<p class="card-text">'+nomeFilme[i].overview+'</p>';
			cardFilme += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+nomeFilme[i].release_date+'</small></p>';
			cardFilme += '<p class="card-text"><small class="text-muted">Média: '+nomeFilme[i].vote_average+'</small></p>';
			cardFilme += '</div>';
			cardFilme += '</div>';
			

		console.log(nomeFilme[i].title);			
		}
		//mostrando html
		document.getElementById('root').innerHTML = cardFilme;
		document.getElementById('title').innerHTML = buscaTitle;			

		
	});
}

function weekFilmes() {
	axios.get(Base_URL+'trending/movie/week?api_key='+API_key)
		.then(function(response){
		console.log(response);
		var nomeFilme  =  response.data.results;
		var cardFilme = '';
		var weekTitle = '';
		console.log(nomeFilme);

		//criando Titulo
		weekTitle += '<h1> Filmes em Destaque </h1>';


		//Card dos Filmes
		for (var i = 0; i < nomeFilme.length; i++) {
			cardFilme += '<div class="card" style="width: 15rem;">';
			cardFilme += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+Base_IMG+'w200/'+nomeFilme[i].poster_path+'">';
			cardFilme += '<div class="card-body">';
			cardFilme += '<h5 class="text-muted">'+nomeFilme[i].title+'</h5>';
			cardFilme += '<p class="card-text"><small class="text-muted">Data de Lançamento: '+nomeFilme[i].release_date+'</small></p>';
			cardFilme += '<p class="card-text"><small class="text-muted">Média: '+nomeFilme[i].vote_average+'</small></p>';
			cardFilme += '</div>';
			cardFilme += '</div>';

		console.log(nomeFilme[i].title);			
		}
		//mostrando html
		document.getElementById('root').innerHTML = cardFilme;
		document.getElementById('title').innerHTML = weekTitle;

		
	});
}