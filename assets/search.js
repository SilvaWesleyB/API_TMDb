document.getElementById('form').addEventListener('submit', pesquisarFilmes);

function pesquisarFilmes(e){
	var pesquisarFilme = document.getElementById("pesquisarFilme").value;
	buscarFilmes(pesquisarFilme);
	console.log(e);
	e.preventDefault();
}

function buscarFilmes(pesquisarFilme){
	
	axios.get('https://api.themoviedb.org/3/search/movie?api_key=0ee05a8fe5aefee62bbcafda1e92b900&query='+pesquisarFilme).then(function(response){
		console.log(response);
		var filmePesquisado  =  response.data.results;
		var mostraFilmes = '';
		console.log(filmePesquisado);

		for (var i = 0; i < filmePesquisado.length; i++) {
			mostraFilmes += '<div class="col-lg-4">';
			mostraFilmes += '<img class="img-thumbnail" src="https://image.tmdb.org/t/p/w300/'+filmePesquisado[i].poster_path+'">';
			mostraFilmes += '<br/><br/>';
			mostraFilmes += '<h4 class="text-muted">'+filmePesquisado[i].title+'</h4><br/>';
			mostraFilmes += '<button type="button" class="btn btn-primary" id="detalhes" onclick="info('+filmePesquisado[i].id+');">Detalhes</button>';
			mostraFilmes += '</div>';

			console.log(filmePesquisado[i].title);			
		}
		
		document.getElementById('mFilmes').innerHTML = mostraFilmes;			

		
	}).catch(function (error){
		console.log(error);
	});
}

function exibirFilme(){
	var idFilme = sessionStorage.getItem('idFilme'); 

	axios.get('https://api.themoviedb.org/3/movie/'+idFilme+'?api_key=0ee05a8fe5aefee62bbcafda1e92b900')
	.then(function(response){
		var filmeDetalhado = response;
		console.log(filmeDetalhado);
		
		var mostraDetalhes = '';

		mostraDetalhes += '<p> Sinopse: '+filmeDetalhado.data.overview+'</p>';

		

		document.getElementById('detalhe').innerHTML = mostraDetalhes;
	}).catch(function(error){
		console.log(error);
	});
}