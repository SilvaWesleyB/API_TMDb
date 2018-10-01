var httpApi = new XMLHttpRequest();
httpApi.open('GET', 'https://api-pacientes.herokuapp.com/pacientes')
httpApi.onreadystatechange = function() {

    var data = JSON.parse(this.responseText);
    if(httpApi.status ==200 && httpApi.status < 400){
        data.forEach(week =>{
            
        })
    }
        
}
httpApi.send();