//0ee05a8fe5aefee62bbcafda1e92b90

		let baseURL = 'https://api.themoviedb.org/3/';
        let baseKey = '0ee05a8fe5aefee62bbcafda1e92b90';
        
        let getConfig = function () {
            let url = "".concat(baseURL, 'configuration?api_key=', baseKey); 
            fetch(url)
            .then((result)=>{
                return result.json();
            })
            .catch(function(err){
                alert(err);
            });
        
        
        document.addEventListener('DOMContentLoaded', getConfig);